import { View, StyleSheet } from "react-native";
import { EventBref } from "./EventBref";
import { EventList } from "./EventList";
import { GlobalStyles } from "../../constants/styles";

export const EventDashboard = ({ events, interval }) => {
  return (
    <View style={styles.container}>
      <EventBref events={events} interval={interval} />
      <EventList events={events} />
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
