import { Text, Pressable, StyleSheet, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import { formatDate } from "../../utils/date";
import { useNavigation } from "@react-navigation/native";

export const EventItem = ({ data }) => {
  const navigate = useNavigation();

  const pressHandler = () => {
    navigate.navigate("Management", {
      eventId: data.id,
    });
  };

  return (
    <Pressable
      onPress={pressHandler}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View style={styles.container}>
        <View>
          <Text style={[styles.base, styles.detail]}>{data.detail}</Text>
          <Text style={styles.base}>{formatDate(new Date(data.date))}</Text>
        </View>
        <View style={styles.budgetContainer}>
          <Text style={styles.budget}>{data.budget.toFixed(2)}€</Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginVertical: 8,
    backgroundColor: GlobalStyles.colors.primary500,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 5,
    elevation: 5,
    shadowColor: GlobalStyles.colors.gray500,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
  },
  base: {
    color: GlobalStyles.colors.primary50,
  },
  detail: {
    fontSize: 12,
    marginBottom: 5,
    fontWeight: "bold",
  },
  budgetContainer: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    minWidth: 100,
  },
  budget: {
    color: GlobalStyles.colors.primary500,
    fontWeight: "bold",
  },
  pressed: {
    opacity: 0.5,
  },
});
