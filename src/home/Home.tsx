import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Markdown from 'markdown-to-jsx';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import LayoutContainer from '../common/components/LayoutContainer';
import ManifestContext from '../common/state/ManifestContext';
import { ManifestDashboard } from '../common/interfaces';

const Home: React.FC = () => {
  const { manifest } = useContext(ManifestContext);

  if (manifest) {
    return (
      <Container>
        <Content>

          <LayoutContainer>
            <SiteTitle>{manifest.general.title}</SiteTitle>

            <MarkdownContent>{manifest.general.description}</MarkdownContent>

            <DashboardList
              dashboards={manifest.dashboards}
            />
          </LayoutContainer>

        </Content>
      </Container>
    );
  } else {
    return (
      <Container>
        Loading...
      </Container>
    );
  }
}

export default Home;

const Container = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  overflow: auto;
  display: flex;
  flex-direction: column;
  align-content: stretch;
`;

const Content = styled.div`
  padding: 2rem 0 4rem;
`;

const SiteTitle = styled.h1`
  margin: 0 0 1rem;
  font-weight: normal;
  font-size: 48px;
`;

const MarkdownContent: React.FC = ({ children }) => (
  <Markdown>{children}</Markdown>
);

interface DashboardListProps {
  dashboards: ManifestDashboard[]
}

const DashboardList: React.FC<DashboardListProps> = ({ dashboards }) => {
  const history = useHistory();

  const navigateTo = (location: string) => {
    history.push(location);
  };

  return (
    <DashboardListContainer>
      <DashboardListTitle>
        <Typography variant="h4">Dashboards</Typography>
      </DashboardListTitle>
      <Paper>
        <List component="nav">
          {dashboards.map(dashboard => (
            <ListItem
              key={dashboard.slug}
              button
              onClick={() => navigateTo(`/dashboard/${dashboard.slug}`)}
            >
              <ListItemText primary={dashboard.title} />
            </ListItem>
          ))}
        </List>
      </Paper>
    </DashboardListContainer>
  );
};

const DashboardListContainer = styled.div`

`;

const DashboardListTitle = styled.div`
  margin-top: 2rem;
  margin-bottom: 1rem;
`;
