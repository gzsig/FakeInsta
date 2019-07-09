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
import Post from "../post";
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

  render() {
    return (
      <FlatList
        style={styles.container}
        keyExtractor={item => item.id.toString()}
        data={this.state.photos}
        renderItem={({ item }) => <Post photo={item} />}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: { marginTop: 35 }
});
