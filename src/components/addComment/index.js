import React, { Component } from "react";
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Image
} from "react-native";

export default class AddComment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      commentContent: ""
    };
  }

  render() {
    return (
      <View style={styles.newComment}>
        <TextInput
          style={styles.input}
          placeholder="Add a comment..."
          ref={input => (this.inputValue = input)}
          onChangeText={text => this.setState({ commentContent: text })}
        />
        <TouchableOpacity
          onPress={() => {
            this.props.callBack(
              this.props.idPhoto,
              this.state.commentContent,
              this.inputValue,
            );
            this.setState({ commentContent: "" });
          }}
        >
          <Image
            source={require("../../../resources/img/submit.png")}
            style={styles.submit}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
