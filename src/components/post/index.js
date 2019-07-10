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
const width = Dimensions.get("screen").width;

export default class Post extends Component {
  constructor(props) {
    super(props);

    this.state = {
      photo: this.props.photo,
      commentContent: ""
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

  newComment = () => {
    const allComments = [
      ...this.state.photo.comentarios,
      {
        id: this.state.commentContent,
        login: "gzsig",
        texto: this.state.commentContent
      }
    ];

    const updatePhoto = {
      ...this.state.photo,
      comentarios: allComments
    };

    this.setState({ photo: updatePhoto });
    this.inputValue.clear();
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
          <View style={styles.newComment}>
            <TextInput
              style={styles.input}
              placeholder="Add a comment..."
              ref={input => (this.inputValue = input)}
              onChangeText={text => this.setState({ commentContent: text })}
            />
            <TouchableOpacity onPress={this.newComment.bind(this)}>
              <Image
                source={require("../../../resources/img/submit.png")}
                style={styles.submit}
              />
            </TouchableOpacity>
          </View>
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
  },
  input: {
    height: 40,
    flex: 1
  },
  submit: {
    height: 20,
    width: 20
  },
  newComment: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "grey"
  }
});
