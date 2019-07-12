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


  showComments = photo => {
    if (photo.comentario === "") return null;

    return <Text>{photo.comentario}</Text>;
  };

  render() {
    const { like, photo, comment } = this.props;
    return (
      <View>
        <View style={styles.header}>
          <Image source={{ uri: photo.urlPerfil }} style={styles.profilePic} />
          <Text>{photo.loginUsuario}</Text>
        </View>
        <Image source={{ uri: photo.urlFoto }} style={styles.post} />
        <View style={styles.imageFooter}>
          <Likes photo={photo} like={like} />
          {this.showComments(photo)}

          {photo.comentarios.map(comment => (
            <View style={styles.comment} key={comment.id}>
              <Text style={{ fontWeight: "bold", marginRight: 5 }}>
                {comment.login}
              </Text>
              <Text>{comment.texto}</Text>
            </View>
          ))}
          <AddComment callBack={comment} idPhoto={photo.id}/>
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
