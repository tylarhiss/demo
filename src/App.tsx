import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, Link } from "react-router-dom";
import { Route, useHistory } from "react-router";
import { ActionsPage } from "pages/actions/ActionsPage";
import { ReducersPage } from "pages/reducers/ReducersPage";
import { SelectorsPage } from "pages/selectors/SelectorsPage";
import clsx from "clsx";

import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";

import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import { MenuOutlined } from "@material-ui/icons";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { Divider } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  drawer: {
    width: "500px"
  },
  content: {
    marginTop: "64px"
  }
}));

const routes: { text: string; route: string }[] = [
  {
    text: "Actions",
    route: "/actions"
  },
  {
    text: "Reducers",
    route: "/actions"
  },
  {
    text: "Selectors",
    route: "/actions"
  }
];

const SideBar = () => {
  const { push } = useHistory();

  const handleNavigation = (path: string) => {
    push(path);
  };

  return (
    <List>
      {/* <ListItem button component="a" onClick={handleNavigation}>
        <ListItemText primary={"Actions"} />
      </ListItem>
      <Divider></Divider>

      <Link to={"/reducers"}>Reducers</Link>
      <Link to={"/selectors"}>Selectors</Link> */}
      {routes.map(r => (
        <React.Fragment key={r.text}>
          <ListItem
            button
            component="a"
            onClick={() => handleNavigation(r.route)}
          >
            <ListItemText primary={r.text} />
          </ListItem>
          <Divider></Divider>
        </React.Fragment>
      ))}
    </List>
  );
};

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const classes = useStyles();

  return (
    <BrowserRouter>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={() => setMenuOpen(true)}
          >
            <MenuOutlined />
          </IconButton>
          <Typography variant="h6" noWrap>
            Mini variant drawer
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer open={menuOpen} onBackdropClick={() => setMenuOpen(false)}>
        <SideBar />
      </Drawer>

      <div className={classes.content}>
        <Route path={"/actions"} component={ActionsPage} />
        <Route path={"/reducers"} component={ReducersPage} />
        <Route path={"/selectors"} component={SelectorsPage} />
      </div>
    </BrowserRouter>
  );
}

export default App;
