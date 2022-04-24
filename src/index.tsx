import React from 'react';
import 'antd/dist/antd.css';
import ReactDOM from 'react-dom';
import './index.css';
import { App } from './app';
import { UserContextProvider } from './app/context/user-context';
import { AdminContextProvider } from './app/context/admin-context';
import { RememberAdminProvider } from './app/context/remember-me-admin-context';
import { RememberUserProvider } from './app/context/remember-me-user-context';

ReactDOM.render(
  <React.StrictMode>
    <UserContextProvider>
      <AdminContextProvider>
        <RememberAdminProvider>
          <RememberUserProvider>
            <App />
          </RememberUserProvider>
        </RememberAdminProvider>
      </AdminContextProvider>
    </UserContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
