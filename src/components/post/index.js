import React, { Component } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity,
  TextInput
} from "react-native";
import AddComment from "../addComment";
const width = Dimensions.get("screen").width;

export default class Post extends Component {
  constructor(props) {
    super(props);

    this.state = {
      photo: this.props.photo
    };
  }

  getLikeIcon = likeada => {
    return likeada
      ? require("../../../resources/img/liked.png")
      : require("../../../resources/img/like.png");
  };

  like = () => {
    const { photo } = this.state;

    let allLikes = [];

    if (!photo.likeada) {
      allLikes = photo.likers.concat({ login: "gzsig" });
    } else {
      allLikes = allLikes = photo.likers.filter(liker => {
        return liker.login != "gzsig";
      });
    }

    const likeState = {
      ...photo,
      likeada: !photo.likeada,
      likers: allLikes
    };
    this.setState({ photo: likeState });
  };

  showLikes = likers => {
    if (likers.length <= 0) return null;

    return (
      <Text style={styles.likes}>
        {likers.length} {likers.length > 1 ? "curtidas" : "curtida"}
      </Text>
    );
  };

  showComments = photo => {
    if (photo.comentario === "") return null;

    return <Text>{photo.comentario}</Text>;
  };

  newComment = (commentContent, inputValue) => {
    if (commentContent === "") return;

    const allComments = [
      ...this.state.photo.comentarios,
      {
        id: commentContent,
        login: "gzsig",
        texto: commentContent
      }
    ];

    const updatePhoto = {
      ...this.state.photo,
      comentarios: allComments
    };

    this.setState({ photo: updatePhoto });
    inputValue.clear();
  };

  render() {
    const { photo } = this.state;
    return (
      <View>
        <View style={styles.header}>
          <Image source={{ uri: photo.urlPerfil }} style={styles.profilePic} />
          <Text>{photo.loginUsuario}</Text>
        </View>
        <Image source={{ uri: photo.urlFoto }} style={styles.post} />
        <View style={styles.imageFooter}>
          <TouchableOpacity
            onPress={this.like.bind(this)}
            style={styles.heartIcon}
          >
            <Image
              source={this.getLikeIcon(photo.likeada)}
              style={styles.heartIcon}
            />
          </TouchableOpacity>
          {this.showLikes(photo.likers)}
          {this.showComments(photo)}

          {photo.comentarios.map(comment => (
            <View style={styles.comment} key={comment.id}>
              <Text style={{ fontWeight: "bold", marginRight: 5 }}>
                {comment.login}
              </Text>
              <Text>{comment.texto}</Text>
            </View>
          ))}
          <AddComment callBack={this.newComment.bind(this)} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: { flexDirection: "row", alignItems: "center", margin: 10 },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10
  },
  post: { width: width, height: width },
  heartIcon: {
    width: 20,
    height: 20
  },
  imageFooter: {
    width: width,
    padding: 10
  },
  likes: {
    marginTop: 5,
    fontWeight: "bold"
  },
  comment: {
    flexDirection: "row"
  }
});
