import { useState } from "react";
import { View, TextInput, Button, StyleSheet, Modal, Image } from "react-native";

export const ItemInput = (props) => {
  const [inputText, setInputText] = useState("");

  function inputHandler(content) {
    setInputText(content);
  }

  function pressHandler() {
    props.onConfirm(inputText);
    setInputText("");
  }

  return (
    <Modal visible={props.visible} animationType="slide">
      <View style={styles.inputContainer}>
        <Image style={styles.image} source={require("../assets/images/goal.png")} />
        <TextInput
          style={styles.inputText}
          placeholder="Enter here"
          value={inputText}
          onChangeText={inputHandler}
        />
        <View style={styles.buttonGroup}>
          <View style={styles.buttonContainer}>
            <Button title="Cancel" onPress={props.onCancel} />
          </View>
          <View style={styles.buttonContainer}>
            <Button title="Go !" onPress={pressHandler} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    flexDirection: "colume",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
    borderBottomWidth: 2,
    borderBottomColor: "#aaaaaa",
    backgroundColor: "#333333",
  },
  inputText: {
    borderWidth: 2,
    borderColor: "#888888",
    width: "90%",
    marginRight: 10,
    padding: 5,
  },
  buttonGroup: {
    flexDirection: "row",
  },
  buttonContainer: {
    marginTop: 10,
    marginHorizontal: 5,
  },
  image: {
    height: 100,
    width: 100,
  },
});
