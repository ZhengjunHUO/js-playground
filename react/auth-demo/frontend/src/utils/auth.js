import { redirect } from "react-router-dom";

export const getTokenDuration = () => {
  const storedExpirationDate = localStorage.getItem("expiration");
  const expirationDate = new Date(storedExpirationDate);
  const now = new Date();
  const duration = expirationDate.getTime() - now.getTime();
  return duration;
};

export const getToken = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return null;
  }

  const duration = getTokenDuration();
  if (duration < 0) {
    return "EXPIRED";
  }

  return token;
};

export const tokenLoader = () => {
  const token = getToken();
  return token;
};

export const checkLoader = () => {
  const token = getToken();
  if (!token) {
    return redirect("/auth");
  }
};
