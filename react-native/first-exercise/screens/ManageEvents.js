import { useLayoutEffect } from "react";
import { View, StyleSheet } from "react-native";
import { IconButton } from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import { Button } from "../components/UI/Button";
import { useDispatch } from "react-redux";
import { eventsAction } from "../store/events";

export const ManageEvents = ({ route, navigation }) => {
  const eventId = route.params?.eventId;
  const isModifying = !!eventId;

  const dispatch = useDispatch();

  const deleteHandler = () => {
    dispatch(eventsAction.delete(eventId));
    navigation.goBack();
  };

  const cancelHandler = () => {
    navigation.goBack();
  };

  const confirmHandler = () => {
    if (isModifying) {
      dispatch(
        eventsAction.update(
          eventId,
          25,
          "updated event",
          new Date("2024-5-5").toISOString(),
        ),
      );
    } else {
      dispatch(
        eventsAction.add(30, "new event", new Date("2024-6-6").toISOString()),
      );
    }
    navigation.goBack();
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isModifying ? "Update Event" : "Create Event",
    });
  }, [isModifying, navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.buttons}>
        <Button mode="flat" onPress={cancelHandler} style={styles.button}>
          Cancel
        </Button>
        <Button onPress={confirmHandler} style={styles.button}>
          {isModifying ? "Update" : "Create"}
        </Button>
      </View>
      {isModifying && (
        <View style={styles.delete}>
          <IconButton
            icon="trash"
            size={30}
            color={GlobalStyles.colors.error500}
            onPress={deleteHandler}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  delete: {
    marginTop: 15,
    paddingTop: 5,
    borderTopColor: GlobalStyles.colors.primary200,
    borderTopWidth: 4,
    alignItems: "center",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    marginHorizontal: 10,
    minWidth: 50,
  },
});
