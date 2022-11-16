import { useEffect, useContext } from "react";
import PropTypes from "prop-types";

import { AppContext } from "../../common/context";
import { logoutUser } from "./functions/logoutUser";

const Logout = ({ removeToken }) => {
  const contextMgr = useContext(AppContext);

  useEffect(
    () => {
      const { token } = contextMgr;
      if (!token) return null;

      const cleanUp = async (token) => {
        await logoutUser(token);
      };

      console.log("logging out");
      cleanUp(token);
      removeToken();
      contextMgr.token = null;
      console.info("contextMgr:", contextMgr);
<<<<<<< HEAD
      window.location.pathname = "/mitxpro-capstone/";
=======
      window.location.pathname = "/";
>>>>>>> main
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
