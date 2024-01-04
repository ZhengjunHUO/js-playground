import { View, StyleSheet } from "react-native";
import { EventBref } from "./EventBref";
import { EventList } from "./EventList";
import { GlobalStyles } from "../../constants/styles";

const EVENTS_EXAMPLES = [
  {
    id: "1",
    budget: 35,
    detail: "init event",
    date: new Date("2024-1-1"),
  },
  {
    id: "2",
    budget: 108,
    detail: "rencontre",
    date: new Date("2024-1-5"),
  },
  {
    id: "3",
    budget: 10,
    detail: "expo",
    date: new Date("2024-1-8"),
  },
  {
    id: "4",
    budget: 73,
    detail: "hiking",
    date: new Date("2024-1-14"),
  },
  {
    id: "5",
    budget: 153,
    detail: "annivers",
    date: new Date("2024-1-15"),
  },
  {
    id: "6",
    budget: 54,
    detail: "shopping",
    date: new Date("2024-1-20"),
  },
  {
    id: "7",
    budget: 120,
    detail: "summit",
    date: new Date("2024-1-22"),
  },
];

export const EventDashboard = ({ events, interval }) => {
  return (
    <View style={styles.container}>
      <EventBref events={EVENTS_EXAMPLES} interval={interval} />
      <EventList events={EVENTS_EXAMPLES} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: GlobalStyles.colors.primary700,
  },
});
