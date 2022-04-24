// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React, { createContext, FC, ReactNode, useState } from 'react';

const State = {
  username: '',
  password: '',
};

export const UserContext = createContext(State);
export const UserDispatchContext = createContext(undefined);

export type UserContextContextProps = {
  children: ReactNode;
};

export const UserContextProvider: FC<UserContextContextProps> = ({
  children,
}) => {
  const initialState = {
    username: '',
    password: '',
  };

  const [selfServiceRequest, setSelfServiceRequest] =
    useState<State>(initialState);

  return (
    <UserContext.Provider value={selfServiceRequest}>
      <UserDispatchContext.Provider value={setSelfServiceRequest}>
        {children}
      </UserDispatchContext.Provider>
    </UserContext.Provider>
  );
};
