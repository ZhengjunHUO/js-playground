import { StyleSheet, Text, TextInput, View, Button } from "react-native";

export default function App() {
  return (
    <View style={styles.rootContainer}>
      <View style={styles.inputContainer}>
        <TextInput style={styles.inputText} placeholder="Enter here" />
        <Button title="Go !" />
      </View>
      <View>
        <Text>TODO</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    padding: 80,
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  inputText: {
    borderWidth: 2,
    borderColor: "#888888",
    width: "90%",
    marginRight: 10,
    padding: 5,
  },
});
