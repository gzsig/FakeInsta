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
const width = Dimensions.get("screen").width;

export default class Feed extends Component {
  render() {
    const photos = [
      { id: 1, user: "Gabriel" },
      { id: 2, user: "Fernanda" },
      { id: 3, user: "Bruno" }
    ];
    return (
      <FlatList
        style={styles.container}
        keyExtractor={item => item.id.toString()}
        data={photos}
        renderItem={({ item }) => (
          <View>
            <View style={styles.header}>
              <Image
                source={require("../../../resources/img/gabe.jpg")}
                style={styles.profilePic}
              />
              <Text>{item.user}</Text>
            </View>
            <Image
              source={require("../../../resources/img/gabe.jpg")}
              style={styles.post}
            />
          </View>
        )}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: { marginTop: 35 },
  header: { flexDirection: "row", alignItems: "center", margin: 10 },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10
  },
  post: { width: width, height: width }
});
