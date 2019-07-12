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
import AddComment from "../AddComment";
import Likes from "../Likes";
const width = Dimensions.get("screen").width;

export default class Post extends Component {
  constructor(props) {
    super(props);

    this.state = {
      photo: this.props.photo
    };
  }



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
<Likes like = {this.like.bind(this)}  photo = {photo}/>
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
  imageFooter: {
    width: width,
    padding: 10
  },
  comment: {
    flexDirection: "row"
  }
});
