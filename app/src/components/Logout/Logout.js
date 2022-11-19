import { useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { NotificationManager } from "react-notifications";

import useToken from "../../common/useToken";
import { store } from "../../common/store";
import { logoutUser } from "./functions/logoutUser";

const Logout = ({ removeToken }) => {
  const { token } = useToken();
  const navigate = useNavigate();

  useEffect(
    () => {
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
      store.clear();
      navigate("/login");
      // window.location.pathname = "/mitxpro-capstone/";
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
