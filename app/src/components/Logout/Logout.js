import { useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { NotificationManager } from "react-notifications";

import { AppContext } from "../../common/context";
import { logoutUser } from "./functions/logoutUser";

const Logout = ({ removeToken }) => {
  const contextMgr = useContext(AppContext);

  useEffect(
    () => {
      const { token } = contextMgr;
      if (!token) return; // leave undefined

      const cleanUp = async (token) => {
        try {
          await logoutUser(token);
        } catch (error) {
          const { errorCode, errorMessage } = error;
          NotificationManager.error(`${errorMessage} (${errorCode})`, "Error!");
        }
      };

      cleanUp(token);
      removeToken();
      contextMgr.token = null;
      window.location.pathname = "/mitxpro-capstone/";
    },
    // eslint-disable-next-line
    []
  );
  return null;
};

Logout.propTypes = {
  removeToken: PropTypes.func.isRequired,
};

export default Logout;
