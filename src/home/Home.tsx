import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Typography } from '@material-ui/core';
import Markdown from 'markdown-to-jsx';

import LayoutContainer from '../common/components/LayoutContainer';
import ManifestContext from '../common/state/ManifestContext';
import { ManifestDashboard } from '../common/interfaces';

const Home: React.FC = () => {
  const { manifest } = useContext(ManifestContext);

  if (manifest) {
    return (
      <Container>

        <LayoutContainer>
          <Typography variant="h3">
            {manifest.general.title}
          </Typography>

          <Content>{manifest.general.description}</Content>

          <DashboardList
            dashboards={manifest.dashboards}
          />
        </LayoutContainer>

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
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-content: stretch;
  padding-top: 1rem;
`;

const Content: React.FC = ({ children }) => (
  <Markdown>{children}</Markdown>
);

interface DashboardListProps {
  dashboards: ManifestDashboard[]
}

const DashboardList: React.FC<DashboardListProps> = ({ dashboards }) => (
  <DashboardListContainer>
    <Typography variant="h4">Dashboards</Typography>
    {dashboards.map(dashboard => (
      <p>
        <Link to={`/dashboard/${dashboard.slug}`}>
          {dashboard.title}
        </Link>
      </p>
    ))}
  </DashboardListContainer>
);

const DashboardListContainer = styled.div`

`;
