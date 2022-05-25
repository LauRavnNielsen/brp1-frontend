import React, { useContext, useState } from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Menu } from 'antd';
import styled from 'styled-components';
import { LoginView } from './login/view';
import { UserContext, UserDispatchContext } from './context/user-context';
import { CreateView } from './create/view';
import { PrivateRoute } from './routing/protected-route';
// eslint-disable-next-line import/no-cycle
import { DietView } from './diet/view';
import { GuideLinesView } from './guide-lines/view';
// eslint-disable-next-line import/no-cycle
import { TrackingView } from './tracking/view';
import { AdminContext, AdminDispatchContext } from './context/admin-context';
import { SettingsView } from './settings/view';
import { AdminLoginView } from './admin-login/view';
// eslint-disable-next-line import/no-cycle
import { ManageRecipe } from './manage-recipe/view';
import { ManageUsers } from './manage-users/view';

const PageContainer = styled.div`
  display: flex;
  flex-grow: 1;
  min-height: 100vh !important;
  max-height: 100vh !important;
  position: relative;
  flex-direction: row;
  zindex: 1;
  overflow: hidden;

  .material-icons {
    font-size: 24px !important;
  }
`;

export const App = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { refetchOnWindowFocus: false } },
  });

  const { username } = useContext(UserContext);
  const { username: adminUsername } = useContext(AdminContext);
  const setUser = useContext(UserDispatchContext);
  const setAdmin = useContext(AdminDispatchContext);
  const [currentMenu, setCurrentMenu] = useState<string>('Recipe');

  const handleClick = (e: { key: React.SetStateAction<string> }) => {
    setCurrentMenu(e.key);

    if (e.key === 'Logout') setCurrentMenu('Recipe');
  };

  const loggedIn = !!(username || adminUsername);

  const isAdmin = !!adminUsername;

  return (
    <QueryClientProvider client={queryClient}>
      <PageContainer>
        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
        {/* @ts-ignore */}
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
                key="Recipe"
                icon={<span className="material-icons">tapas</span>}
              >
                <Link to="/">Recipes</Link>
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
              {isAdmin && (
                <Menu.SubMenu
                  title="Admin-panel"
                  icon={<span className="material-icons">build</span>}
                >
                  <Menu.Item
                    key="admin-guide-lines"
                    icon={<span className="material-icons">menu_book</span>}
                  >
                    <Link to="/admin-panel/guide-lines">Manage guidelines</Link>
                  </Menu.Item>
                  <Menu.Item
                    key="admin-recipes"
                    icon={<span className="material-icons">tapas</span>}
                  >
                    <Link to="/admin-panel/recipes">Manage recipes</Link>
                  </Menu.Item>
                  <Menu.Item
                    key="admin-users"
                    icon={
                      <span className="material-icons">account_circle</span>
                    }
                  >
                    <Link to="/admin-panel/users">Manage users</Link>
                  </Menu.Item>
                </Menu.SubMenu>
              )}
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
                  setCurrentMenu('Recipe');
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
              <Route path="/admin-panel/users">
                <PrivateRoute condition={!isAdmin}>
                  <ManageUsers />
                </PrivateRoute>
              </Route>
              <Route path="/admin-panel/guide-lines">
                <PrivateRoute condition={!isAdmin}>
                  <GuideLinesView admin />
                </PrivateRoute>
              </Route>
              <Route path="/admin-panel/recipes">
                <PrivateRoute condition={!isAdmin}>
                  <ManageRecipe />
                </PrivateRoute>
              </Route>
              <Route path="/">
                <PrivateRoute condition={!loggedIn} redirect="/login">
                  <ManageRecipe />
                </PrivateRoute>
              </Route>
            </Switch>
          </div>
        </Router>
      </PageContainer>
    </QueryClientProvider>
  );
};
