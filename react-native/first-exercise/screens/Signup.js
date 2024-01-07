import { useState } from "react";
import { AuthContent } from "../components/Auth/AuthContent";
import { createUser } from "../utils/auth";
import { Loading } from "../components/UI/Loading";
import { Alert } from "react-native";
import { authAction } from "../store/auth";
import { useDispatch } from "react-redux";

export const Signup = () => {
  const [isAuth, setIsAuth] = useState(false);
  const dispatch = useDispatch();

  const signupHandler = async ({ email, password }) => {
    setIsAuth(true);
    try {
      const token = await createUser(email, password);
      dispatch(authAction.authed(token));
    } catch (e) {
      Alert.alert("Sign up failed!", "Check email and password and try again");
      setIsAuth(false);
    }
  };

  if (isAuth) {
    return <Loading />;
  }

  return <AuthContent onAuthenticate={signupHandler} />;
};
