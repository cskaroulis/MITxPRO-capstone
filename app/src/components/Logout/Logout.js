import { useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

import useToken from "../../common/useToken";
import { store } from "../../common/store";
import { logoutUser } from "./functions/logoutUser";
import { handleError } from "../../common/errorHandling";

const Logout = ({ removeToken }) => {
  const { token } = useToken();
  const navigate = useNavigate();

  const dealWithIt = (error) => {
    handleError("Failed to logout:", error);
  };

  useEffect(
    () => {
      if (!token) return; // leave undefined

      const cleanUp = async (token) => {
        try {
          await logoutUser(token);
        } catch (error) {
          dealWithIt(error);
        }
      };

      cleanUp(token);
      removeToken();
      store.clear();
      navigate("/login");
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
