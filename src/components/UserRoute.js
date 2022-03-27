import React from "react";
import { Redirect, Route } from "react-router-dom";

const ProtectedLayout = ({ children, ...rest }) => {
  return <>{children}</>;
};

const UserRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(matchProps) => {
        if (localStorage.getItem("access_token")) {
          return (
            <ProtectedLayout>
              <Component {...matchProps} />
            </ProtectedLayout>
          );
        } else {
          return (
            <Redirect
              to={{
                pathname: "/user/login",
                state: {
                  from: matchProps.location,
                },
              }}
            />
          );
        }
      }}
    />
  );
};

export default UserRoute;
