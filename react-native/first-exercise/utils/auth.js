import axios from "axios";

const API_KEY = "YOUR_KEY";

const auth = async (mode, email, password) => {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;
  const resp = await axios.post(url, {
    email: email,
    password: password,
    returnSecureToken: true,
  });
  //console.log(resp);
  const token = resp.data.idToken;

  return token;
};

export const createUser = (email, password) => {
  return auth("signUp", email, password);
};

export const login = (email, password) => {
  return auth("signInWithPassword", email, password);
};
