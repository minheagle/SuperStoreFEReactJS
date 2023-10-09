import React from "react";
import { Link } from "react-router-dom";

import ROUTES from "../../../constants/ROUTES";

const NotAuthentication = () => {
  return (
    <div className="w-full flex flex-col justify-start items-center gap-8 pt-8">
      <div className="w-full flex justify-center items-center">
        <span>Please Login</span>
      </div>
      <div className="w-full flex flex-col justify-start items-center gap-2">
        <Link
          to={ROUTES.PUBLIC.LOGIN}
          className="w-24 h-10 flex justify-center items-center bg-primary text-white rounded"
        >
          Login
        </Link>
        <span>Or</span>
        <Link
          to={ROUTES.PUBLIC.REGISTER}
          className="w-24 h-10 flex justify-center items-center bg-primary text-white rounded"
        >
          Register
        </Link>
      </div>
    </div>
  );
};

export default NotAuthentication;
