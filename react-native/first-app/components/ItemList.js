import { View, Text, FlatList, StyleSheet } from "react-native";

export const ItemList = (props) => {
  return (
    <View style={styles.showContainer}>
      <FlatList
        data={props.items}
        renderItem={(item) => {
          return (
            <View style={styles.showText}>
              <Text>{item.item.content}</Text>
            </View>
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
});
