import React, { useState } from 'react';
import { useHistory } from 'react-router';
import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import HomeIcon from '@material-ui/icons/Home';

interface NavDashboard {
  slug: string
  title: string
}

const EXAMPLE_DASHBOARDS: NavDashboard[] = [
  {
    slug: 'myapp-dependency-usage',
    title: 'MyApp: Dependency usage'
  },
  {
    slug: 'myapp-design-system-usage',
    title: 'MyApp: Design System usage'
  }
];

interface Props {
}

const TopNav: React.FC<Props> = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  return (
    <AppBar position="static">

      <NavDrawer
        dashboards={EXAMPLE_DASHBOARDS}
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
        <Typography variant="h6">
          My Static Analysis Website
        </Typography>
        <Button color="inherit">Login</Button>
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
