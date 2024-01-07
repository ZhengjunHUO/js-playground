import { useState } from "react";
import { AuthContent } from "../components/Auth/AuthContent";
import { login } from "../utils/auth";
import { Loading } from "../components/UI/Loading";
import { Alert } from "react-native";
import { authAction } from "../store/auth";
import { useDispatch } from "react-redux";

export const Login = () => {
  const [isAuth, setIsAuth] = useState(false);
  const dispatch = useDispatch();

  const authHandler = async ({ email, password }) => {
    setIsAuth(true);
    try {
      const token = await login(email, password);
      //console.log(token);
      dispatch(authAction.authed(token));
    } catch (e) {
      setIsAuth(false);
      Alert.alert("Auth failed !", "Check id and password and try again");
    }
  };

  if (isAuth) {
    return <Loading />;
  }

  return <AuthContent isLogin onAuthenticate={authHandler} />;
};
