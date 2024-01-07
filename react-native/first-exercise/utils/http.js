import axios from "axios";

const FIREBASE_ENDPOINT =
  "https://react-native.europe-west1.firebasedatabase.app";

export const addEvent = async (data) => {
  const resp = await axios.post(FIREBASE_ENDPOINT + "/events.json", data);
  //console.log(resp);
  return resp.data.name;
};

export const fetchEvents = async (token) => {
  const resp = await axios.get(
    FIREBASE_ENDPOINT + "/events.json?auth=" + token,
  );

  const rslt = [];

  for (const key in resp.data) {
    const item = {
      id: key,
      budget: resp.data[key].budget,
      date: resp.data[key].date,
      detail: resp.data[key].detail,
    };
    rslt.push(item);
  }

  return rslt;
};

export const updateEvent = async (id, data) => {
  return axios.put(FIREBASE_ENDPOINT + `/events/${id}.json`, data);
};

export const deleteEvent = async (id) => {
  return axios.delete(FIREBASE_ENDPOINT + `/events/${id}.json`);
};
