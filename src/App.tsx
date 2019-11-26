import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import ManifestProvider from './common/components/ManifestProvider';
import TopNav from './common/components/TopNav';
import Dashboard from './dashboard';
import Home from './home';

const App: React.FC = () => {
  return (
    <ManifestProvider>
      <HashRouter>
        <AppContainer>
          <TopNav />
          <AppBody>

            <Switch>
              <Route
                path="/dashboard/:dashboardSlug"
                children={<Dashboard />}
              />
              <Route
                path="/"
                children={<Home />}
              />
            </Switch>

          </AppBody>
        </AppContainer>
      </HashRouter>
    </ManifestProvider>
  );
}

export default App;

const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const AppBody = styled.main`
  flex-grow: 1;
  overflow: hidden;
`;
