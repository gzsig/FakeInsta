import React, { Component } from "react";
import { TouchableOpacity, Image, View, StyleSheet, Text } from "react-native";

export default class Likes extends Component {
  getLikeIcon = likeada => {
    return likeada
      ? require("../../../resources/img/liked.png")
      : require("../../../resources/img/like.png");
  };

  showLikes = likers => {
    if (likers.length <= 0) return null;

    return (
      <Text style={styles.likes}>
        {likers.length} {likers.length > 1 ? "curtidas" : "curtida"}
      </Text>
    );
  };

  render() {
    const { photo, like } = this.props;
    return (
      <View>
        <TouchableOpacity onPress={like} style={styles.heartIcon}>
          <Image
            source={this.getLikeIcon(photo.likeada)}
            style={styles.heartIcon}
          />
        </TouchableOpacity>
        {this.showLikes(photo.likers)}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  likes: {
    marginTop: 5,
    fontWeight: "bold"
  },
  heartIcon: {
    width: 20,
    height: 20
  },
});
