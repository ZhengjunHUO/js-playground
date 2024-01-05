import { View, StyleSheet } from "react-native";
import { EventBref } from "./EventBref";
import { EventList } from "./EventList";
import { GlobalStyles } from "../../constants/styles";

const EVENTS_EXAMPLES = [
  {
    id: "e1",
    budget: 35,
    detail: "init event",
    date: new Date("2024-1-1"),
  },
  {
    id: "e2",
    budget: 108,
    detail: "rencontre",
    date: new Date("2024-1-5"),
  },
  {
    id: "e3",
    budget: 10,
    detail: "expo",
    date: new Date("2024-1-8"),
  },
  {
    id: "e4",
    budget: 73,
    detail: "hiking",
    date: new Date("2024-1-14"),
  },
  {
    id: "e5",
    budget: 153,
    detail: "annivers",
    date: new Date("2024-1-15"),
  },
  {
    id: "e6",
    budget: 54,
    detail: "shopping",
    date: new Date("2024-1-20"),
  },
  {
    id: "e7",
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
