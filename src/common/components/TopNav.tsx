import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import HomeIcon from '@material-ui/icons/Home';

import ManifestContext from '../state/ManifestContext';

interface NavDashboard {
  slug: string
  title: string
}

interface Props {
}

const TopNav: React.FC<Props> = () => {
  const { manifest } = useContext(ManifestContext);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  const title = manifest ? manifest.general.title : 'Loading...';
  const dashboards = manifest ? manifest.dashboards : [];

  return (
    <AppBar position="static">

      <NavDrawer
        dashboards={dashboards}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />

      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={() => setIsDrawerOpen(true)}
        >
          <MenuIcon />
        </IconButton>
        <SiteTitle>{title}</SiteTitle>
      </Toolbar>
    </AppBar>
  )
};

export default TopNav;

interface NavDrawerProps {
  dashboards: NavDashboard[]
  isOpen: boolean
  onClose: () => void
}

const NavDrawer: React.FC<NavDrawerProps> = ({
  dashboards,
  isOpen,
  onClose
}) => {
  const history = useHistory();

  const navigateTo = (location: string) => {
    history.push(location);
    onClose();
  };

  return (
    <Drawer open={isOpen} onClose={onClose}>

      <List component="nav">
        <ListItem button onClick={() => navigateTo('/')}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
      </List>

      <Divider />

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
    </Drawer>
  )
};

const SiteTitle: React.FC = ({ children }) => (
  <Typography variant="h6">
    <SiteTitleLink to="/">
      {children}
    </SiteTitleLink>
  </Typography>
);

const SiteTitleLink = styled(Link)`
  color: white;
  text-decoration: none;

  &:hover {
    opacity: 0.8;
  }
`;
