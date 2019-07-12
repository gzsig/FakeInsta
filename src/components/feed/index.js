import React, { Component } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  FlatList,
  Image,
  Dimensions
} from "react-native";
import Post from "../Post";
const width = Dimensions.get("screen").width;

export default class Feed extends Component {
  constructor(props) {
    super(props);

    this.state = {
      photos: []
    };
  }

  componentDidMount() {
    fetch("https://instalura-api.herokuapp.com/api/public/fotos/rafael")
      .then(answer => answer.json())
      .then(json => this.setState({ photos: json }));
  }

  like = idPhoto => {
    const photo = this.state.photos.find(photo => photo.id === idPhoto);

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
    photos = this.state.photos.map(photo =>
      photo.id === likeState.id ? likeState : photo
    );

    this.setState({ photos: photos });
  };

  newComment = (idPhoto, commentContent, inputValue) => {
    const photo = this.state.photos.find(photo => photo.id === idPhoto);

    if (commentContent === "") return;

    const allComments = [
      ...photo.comentarios,
      {
        id: commentContent,
        login: "gzsig",
        texto: commentContent
      }
    ];

    const updatePhoto = {
      ...photo,
      comentarios: allComments
    };

    photos = this.state.photos.map(photo =>
      photo.id === updatePhoto.id ? updatePhoto : photo
    );
    this.setState({ photos });
    inputValue.clear();
  };

  render() {
    return (
      <FlatList
        style={styles.container}
        keyExtractor={item => item.id.toString()}
        data={this.state.photos}
        renderItem={({ item }) => (
          <Post
            photo={item}
            like={this.like.bind(this)}
            comment={this.newComment.bind(this)}
          />
        )}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: { marginTop: 35 }
});
