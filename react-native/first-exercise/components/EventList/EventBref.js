import { View, Text, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/styles";

export const EventBref = ({ events, interval }) => {
  const sum = events.reduce((sum, event) => {
    return sum + event.budget;
  }, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.intervalContainer}>{interval}</Text>
      <Text style={styles.sumContainer}>{sum.toFixed(2)}€</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: GlobalStyles.colors.primary50,
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  intervalContainer: {
    fontSize: 12,
    color: GlobalStyles.colors.primary500,
  },
  sumContainer: {
    fontSize: 15,
    fontWeight: "bold",
    color: GlobalStyles.colors.primary500,
  },
});
