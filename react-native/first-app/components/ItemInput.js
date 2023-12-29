import { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";

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
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.inputText}
        placeholder="Enter here"
        value={inputText}
        onChangeText={inputHandler}
      />
      <Button title="Go !" onPress={pressHandler} />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
    borderBottomWidth: 2,
    borderBottomColor: "#aaaaaa",
  },
  inputText: {
    borderWidth: 2,
    borderColor: "#888888",
    width: "90%",
    marginRight: 10,
    padding: 5,
  },
});
