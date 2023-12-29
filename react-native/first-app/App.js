import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { ItemInput } from "./components/ItemInput";
import { ItemList } from "./components/ItemList";

export default function App() {
  const [textList, setTextList] = useState([]);

  function pressHandler(text) {
    setTextList((prev) => [
      ...prev,
      { content: text, timestamp: new Date().toISOString() },
    ]);
  }

  return (
    <View style={styles.rootContainer}>
      <ItemInput onConfirm={pressHandler} />
      <ItemList items={textList} />
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    padding: 80,
  },
});
