import { useState } from "react";
import { StyleSheet, Text, TextInput, View, Button } from "react-native";

export default function App() {
  const [inputText, setInputText] = useState("");
  const [textList, setTextList] = useState([]);

  function inputHandler(content) {
    setInputText(content);
    console.log(inputText);
  }

  function pressHandler() {
    setTextList((prev) => [...prev, inputText]);
    console.log(textList);
  }

  return (
    <View style={styles.rootContainer}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputText}
          placeholder="Enter here"
          onChangeText={inputHandler}
        />
        <Button title="Go !" onPress={pressHandler} />
      </View>
      <View style={styles.showContainer}>
        {textList.map((item) => (
          <View key={item} style={styles.showText}>
            <Text>{item}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    padding: 80,
  },
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
  showContainer: {
    flex: 5,
  },
  showText: {
    padding: 5,
    marginBottom: 5,
    borderRadius: 5,
    backgroundColor: "red",
  },
});
