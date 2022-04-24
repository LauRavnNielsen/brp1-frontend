import React, { useContext, useState } from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Menu } from 'antd';
import styled from 'styled-components';
import { LoginView } from './login/view';
import { UserContext, UserDispatchContext } from './context/user-context';
import { CreateView } from './create/view';
import { PrivateRoute } from './routing/protected-route';
import { FoodView } from './food/view';
import { DietView } from './diet/view';
import { GuideLinesView } from './guide-lines/view';
import { TrackingView } from './tracking/view';
import { AdminContext, AdminDispatchContext } from './context/admin-context';
import { SettingsView } from './settings/view';
import { AdminLoginView } from './admin-login/view';

const PageContainer = styled.div`
  display: flex;
  flex-grow: 1;
  min-height: 100vh !important;
  max-height: 100vh !important;
  position: relative;
  flex-direction: row;
  zindex: 1;

  .material-icons {
    font-size: 24px !important;
  }
`;

export const App = () => {
  const queryClient = new QueryClient();

  const { username } = useContext(UserContext);
  const { username: adminUsername } = useContext(AdminContext);
  const setUser = useContext(UserDispatchContext);
  const setAdmin = useContext(AdminDispatchContext);
  const [currentMenu, setCurrentMenu] = useState<string>('');

  const handleClick = (e: { key: React.SetStateAction<string> }) => {
    setCurrentMenu(e.key);

    if (e.key === 'Logout') setCurrentMenu('Food');
  };

  const loggedIn = !!(username || adminUsername);

  return (
    <QueryClientProvider client={queryClient}>
      <PageContainer>
        <Router>
          {loggedIn && (
            <Menu
              onClick={handleClick}
              selectedKeys={[currentMenu]}
              mode="inline"
              style={{
                width: 256,
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
              theme="dark"
            >
              <Menu.Item
                key="Food"
                icon={<span className="material-icons">local_pizza</span>}
              >
                <Link to="/">Food</Link>
              </Menu.Item>
              <Menu.Item
                key="Diet"
                icon={<span className="material-icons">scale</span>}
              >
                <Link to="/diet">Diet</Link>
              </Menu.Item>
              <Menu.Item
                key="Tracking"
                icon={<span className="material-icons">query_stats</span>}
              >
                <Link to="/tracking">Tracking</Link>
              </Menu.Item>
              <Menu.Item
                key="Dietary guidelines"
                icon={<span className="material-icons">menu_book</span>}
              >
                <Link to="/guide-lines">Guidelines</Link>
              </Menu.Item>
              <Menu.Item
                key="Settings"
                icon={<span className="material-icons">account_circle</span>}
              >
                <Link to="/settings">Settings</Link>
              </Menu.Item>
              <Menu.Item
                key="Logout"
                icon={<span className="material-icons">logout</span>}
                onClick={() => {
                  /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
                  // @ts-ignore
                  setUser({});
                  /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
                  // @ts-ignore
                  setAdmin({});
                  setCurrentMenu('Food');
                }}
              >
                Logout
              </Menu.Item>
            </Menu>
          )}
          <div style={{ padding: '2rem', width: '100%' }}>
            <Switch>
              <Route path="/guide-lines">
                <PrivateRoute condition={!loggedIn} redirect="/login">
                  <GuideLinesView />
                </PrivateRoute>
              </Route>
              <Route path="/diet">
                <PrivateRoute condition={!loggedIn} redirect="/login">
                  <DietView />
                </PrivateRoute>
              </Route>
              <Route path="/tracking">
                <PrivateRoute condition={!loggedIn} redirect="/login">
                  <TrackingView />
                </PrivateRoute>
              </Route>
              <Route path="/settings">
                <PrivateRoute condition={!loggedIn} redirect="/login">
                  <SettingsView />
                </PrivateRoute>
              </Route>
              <Route path="/login">
                <PrivateRoute condition={!!loggedIn}>
                  <LoginView />
                </PrivateRoute>
              </Route>
              <Route path="/admin">
                <PrivateRoute condition={!!loggedIn}>
                  <AdminLoginView />
                </PrivateRoute>
              </Route>
              <Route path="/create-account">
                <PrivateRoute condition={!!loggedIn}>
                  <CreateView />
                </PrivateRoute>
              </Route>
              <Route path="/">
                <PrivateRoute condition={!loggedIn} redirect="/login">
                  <FoodView />
                </PrivateRoute>
              </Route>
            </Switch>
          </div>
        </Router>
      </PageContainer>
    </QueryClientProvider>
  );
};
