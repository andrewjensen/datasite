import React from 'react';
import styled from 'styled-components';
import { Typography } from '@material-ui/core';
import LayoutContainer from '../common/components/LayoutContainer';

const Home: React.FC = () => {
  return (
    <Container>

      <LayoutContainer>
        <Typography variant="h3">
          My Static Analysis Website
        </Typography>

        <Content />
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

const Content: React.FC = () => (
  <>
    <p>Prow nipperkin bilge rat cutlass case shot jib bilge water pink boom port. Hail-shot gun Sea Legs interloper fire in the hole swing the lead rum yawl chandler Barbary Coast. Sea Legs port cackle fruit fire ship cog sutler Cat o'nine tails prow Davy Jones' Locker coffer.</p>

    <p>Jury mast boatswain cackle fruit Nelsons folly hulk warp hearties topmast killick coxswain. Carouser Pirate Round scallywag scurvy red ensign bounty ye run a rig gabion bilge rat. Warp marooned hearties Gold Road cable stern provost swab list draft.</p>

    <p>Ahoy no prey, no pay aft rope's end run a rig matey Shiver me timbers dead men tell no tales coxswain swing the lead. Heave down keelhaul Gold Road scourge of the seven seas hearties Sink me Blimey log Pirate Round matey. Black jack aye barkadeer reef crack Jennys tea cup booty avast spike boatswain mizzen. </p>


    <p>Prow nipperkin bilge rat cutlass case shot jib bilge water pink boom port. Hail-shot gun Sea Legs interloper fire in the hole swing the lead rum yawl chandler Barbary Coast. Sea Legs port cackle fruit fire ship cog sutler Cat o'nine tails prow Davy Jones' Locker coffer.</p>

    <p>Jury mast boatswain cackle fruit Nelsons folly hulk warp hearties topmast killick coxswain. Carouser Pirate Round scallywag scurvy red ensign bounty ye run a rig gabion bilge rat. Warp marooned hearties Gold Road cable stern provost swab list draft.</p>

    <p>Ahoy no prey, no pay aft rope's end run a rig matey Shiver me timbers dead men tell no tales coxswain swing the lead. Heave down keelhaul Gold Road scourge of the seven seas hearties Sink me Blimey log Pirate Round matey. Black jack aye barkadeer reef crack Jennys tea cup booty avast spike boatswain mizzen. </p>
  </>
);
