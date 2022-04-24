// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React, { createContext, FC, ReactNode, useState } from 'react';

const State = {
  username: '',
  password: '',
};

export const AdminContext = createContext(State);
export const AdminDispatchContext = createContext(undefined);

export type AdminContextContextProps = {
  children: ReactNode;
};

export const AdminContextProvider: FC<AdminContextContextProps> = ({
  children,
}) => {
  const initialState = {
    username: '',
    password: '',
  };

  const [selfServiceRequest, setSelfServiceRequest] =
    useState<State>(initialState);

  return (
    <AdminContext.Provider value={selfServiceRequest}>
      <AdminDispatchContext.Provider value={setSelfServiceRequest}>
        {children}
      </AdminDispatchContext.Provider>
    </AdminContext.Provider>
  );
};
