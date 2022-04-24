// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React, { createContext, FC, ReactNode } from 'react';
import useLocalStorageState from 'use-local-storage-state';

const State = {
  username: '',
  password: '',
};

export const RememberUserContext = createContext(State);
export const RememberUserDispatchContext = createContext(undefined);

export type RememberUserContextProps = {
  children: ReactNode;
};

export const RememberUserProvider: FC<RememberUserContextProps> = ({
  children,
}) => {
  const initialState = {
    username: '',
    password: '',
  };

  const [userDetails, setUserDetails] = useLocalStorageState<State>(
    'user-remember-me',
    initialState
  );

  return (
    <RememberUserContext.Provider value={userDetails}>
      <RememberUserDispatchContext.Provider value={setUserDetails}>
        {children}
      </RememberUserDispatchContext.Provider>
    </RememberUserContext.Provider>
  );
};
