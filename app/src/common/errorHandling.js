import { NotificationManager } from "react-notifications";

export const handleError = (message, error) => {
  const { errorMessage } = error;
  let displayMessage = null;

  switch (errorMessage) {
    case "jwt expired":
      displayMessage = "Session expired";
      break;
    default:
      displayMessage = `${message} ${errorMessage}`;
      break;
  }

  console.error(displayMessage);
  NotificationManager.error(displayMessage, null, 4000);

  return {
    errorMessage,
    displayMessage,
    mustLogout: errorMessage === "jwt expired",
  };
};

export const isError = (response) => {
  return !!response?.errorMessage;
};
