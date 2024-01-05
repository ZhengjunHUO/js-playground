import { FlatList } from "react-native";
import { EventItem } from "./EventItem";

const renderItemHandler = (data) => {
  return <EventItem data={data.item} />;
};

export const EventList = ({ events }) => {
  return (
    <FlatList
      data={events}
      renderItem={renderItemHandler}
      keyExtractor={(item) => item.id}
    />
  );
};
