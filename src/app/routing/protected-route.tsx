import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';

export type ProtectedRouteTypes = {
  children: React.ReactNode;
  condition: boolean;
  // eslint-disable-next-line react/require-default-props
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
      /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
      // @ts-ignore
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
