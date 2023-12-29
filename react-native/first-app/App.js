import { useState } from "react";
import { Button, StyleSheet, View } from "react-native";
import { ItemInput } from "./components/ItemInput";
import { ItemList } from "./components/ItemList";

export default function App() {
  const [textList, setTextList] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  function pressHandler(text) {
    setTextList((prev) => [
      ...prev,
      { content: text, timestamp: new Date().toISOString() },
    ]);
    flipVisibility();
  }

  const deleteHandler = (id) => {
    setTextList((prev) => {
      return prev.filter((item) => item.timestamp !== id);
    });
  };

  const flipVisibility = () => {
    setIsVisible((prev) => !prev);
  };

  return (
    <View style={styles.rootContainer}>
      <ItemInput
        onConfirm={pressHandler}
        visible={isVisible}
        onCancel={flipVisibility}
      />
      <Button title="Add" onPress={flipVisibility} />
      <ItemList items={textList} onDelete={deleteHandler} />
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    padding: 80,
  },
});
