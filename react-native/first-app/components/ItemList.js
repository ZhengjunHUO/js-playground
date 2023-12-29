import { View, Text, FlatList, StyleSheet, Pressable } from "react-native";

export const ItemList = (props) => {
  return (
    <View style={styles.showContainer}>
      <FlatList
        data={props.items}
        renderItem={(item) => {
          return (
            <Pressable
              onPress={props.onDelete.bind(this, item.item.timestamp)}
              android_ripple={{ color: "#210644" }}
              style={({ pressed }) => pressed && styles.pressedItem}
            >
              <View style={styles.showText}>
                <Text>{item.item.content}</Text>
              </View>
            </Pressable>
          );
        }}
        keyExtractor={(item, _index) => {
          return item.timestamp;
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  showContainer: {
    flex: 5,
  },
  showText: {
    padding: 5,
    marginBottom: 5,
    borderRadius: 5,
    backgroundColor: "red",
  },
  pressedItem: {
    opacity: 0.5,
  },
});
