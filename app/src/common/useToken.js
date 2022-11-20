import { useState } from "react";

// TODO: localStorage is less secure. Refactor. Maybe use http cookies?

export default function useToken() {
  const tokenKey = "capstone-bank-token";

  const getToken = () => {
    const tokenString = localStorage.getItem(tokenKey);
    return tokenString;
  };

  const [token, setToken] = useState(getToken());

  const saveToken = (userToken) => {
    localStorage.setItem(tokenKey, userToken);
    setToken(userToken);
  };

  const removeToken = () => {
    setToken(null);
    localStorage.removeItem(tokenKey);
  };

  return {
    setToken: saveToken,
    removeToken,
    token,
  };
}
