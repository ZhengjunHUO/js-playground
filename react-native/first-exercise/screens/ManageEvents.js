import { useLayoutEffect } from "react";
import { View, StyleSheet } from "react-native";
import { IconButton } from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import { useSelector, useDispatch } from "react-redux";
import { eventsAction } from "../store/events";
import { Form } from "../components/Manage/Form";
import { addEvent, deleteEvent, updateEvent } from "../utils/http";

export const ManageEvents = ({ route, navigation }) => {
  const eventId = route.params?.eventId;
  const isModifying = !!eventId;

  const selected = useSelector((state) => state["events"]).find(
    (item) => item.id === eventId,
  );

  const dispatch = useDispatch();

  const deleteHandler = async () => {
    await deleteEvent(eventId);
    dispatch(eventsAction.delete(eventId));
    navigation.goBack();
  };

  const cancelHandler = () => {
    navigation.goBack();
  };

  const confirmHandler = async ({ budget, date, detail }) => {
    if (isModifying) {
      dispatch(eventsAction.update(eventId, budget, detail, date));
      await updateEvent(eventId, { budget, detail, date });
    } else {
      const id = await addEvent({ budget, date, detail });
      dispatch(eventsAction.add(id, budget, detail, date));
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
      <Form
        onCancel={cancelHandler}
        onConfirm={confirmHandler}
        buttonLabel={isModifying ? "Update" : "Create"}
        target={selected}
      />
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
});
