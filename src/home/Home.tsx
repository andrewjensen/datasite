import React, { useContext } from 'react';
import styled from 'styled-components';
import { Typography } from '@material-ui/core';
import Markdown from 'markdown-to-jsx';

import LayoutContainer from '../common/components/LayoutContainer';
import ManifestContext from '../common/state/ManifestContext';

const Home: React.FC = () => {
  const { manifest } = useContext(ManifestContext);
  const title = manifest ? manifest.general.title : '';
  const description = manifest ? manifest.general.description : '';

  return (
    <Container>

      <LayoutContainer>
        <Typography variant="h3">
          {title}
        </Typography>

        <Content>{description}</Content>
      </LayoutContainer>

    </Container>
  );
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
