// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React, { createContext, FC, ReactNode } from 'react';
import useLocalStorageState from 'use-local-storage-state';

const State = {
  username: '',
  password: '',
};

export const RememberAdminContext = createContext(State);
export const RememberAdminDispatchContext = createContext(undefined);

export type RememberAdminContextProps = {
  children: ReactNode;
};

export const RememberAdminProvider: FC<RememberAdminContextProps> = ({
  children,
}) => {
  const initialState = {
    username: '',
    password: '',
  };

  const [userDetails, setUserDetails] = useLocalStorageState<State>(
    'admin-remember-me',
    initialState
  );

  return (
    <RememberAdminContext.Provider value={userDetails}>
      <RememberAdminDispatchContext.Provider value={setUserDetails}>
        {children}
      </RememberAdminDispatchContext.Provider>
    </RememberAdminContext.Provider>
  );
};
