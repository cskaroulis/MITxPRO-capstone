import { useState } from "react";

// TODO: localStorage is less recure. Refactor.

export default function useToken() {
  const getToken = () => {
    const tokenString = localStorage.getItem("token");
    return tokenString;
  };

  const [token, setToken] = useState(getToken());

  const saveToken = (userToken) => {
    localStorage.setItem("token", userToken);
    setToken(userToken);
  };

  const removeToken = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  return {
    setToken: saveToken,
    removeToken,
    token,
  };
}
