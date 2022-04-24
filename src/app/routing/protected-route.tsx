import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';

export type ProtectedRouteTypes = {
  children: React.ReactNode;
  condition: boolean;
  redirect?: string;
};

export const PrivateRoute = ({
  children,
  condition,
  redirect,
  ...rest
}: ProtectedRouteTypes) => {
  return (
    <Route
      {...rest}
      render={() =>
        !condition ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: redirect || '/',
            }}
          />
        )
      }
    />
  );
};
