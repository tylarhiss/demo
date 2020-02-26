import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, Link } from "react-router-dom";
import { Route, useHistory } from "react-router";

import { ReducersPage } from "pages/reducers/ReducersPage";
import { SelectorsPage } from "pages/selectors/SelectorsPage";

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
import { Example1Page } from "pages/example1/Example1Page";
import { Example2Page } from "pages/example2/Example2Page";
import { Example3Page } from "pages/example3/Example3Page";
import { FinalPage } from "pages/final/FinalPage";

const useStyles = makeStyles(theme => ({
  drawer: {
    width: "500px"
  },
  content: {
    marginTop: "64px",
    padding: "1rem"
  }
}));

const routes: { text: string; route: string }[] = [
  {
    text: "Example1",
    route: "/example1"
  },
  {
    text: "Example2",
    route: "/example2"
  },
  {
    text: "Example3",
    route: "/example3"
  },
  {
    text: "Final",
    route: "/final"
  }
];

const SideBar = () => {
  const { push } = useHistory();

  const handleNavigation = (path: string) => {
    push(path);
  };

  return (
    <List>
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
        <Route path={"/example1"} component={Example1Page} />
        <Route path={"/example2"} component={Example2Page} />
        <Route path={"/example3"} component={Example3Page} />
        <Route path={"/final"} component={FinalPage} />
      </div>
    </BrowserRouter>
  );
}

export default App;
