import { Fade, Hidden } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { themeColors } from "../../App";
import logo from "../../logo.svg";
import { MainListItems } from "../SpringTabs";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: themeColors.first.color,
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonSm: {
    marginRight: 0,
    padding: 0,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    background: themeColors.fourth.color,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    [theme.breakpoints.up("sm")]: {},
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
}));

export default function Appbar({ parallax }) {
  const classes = useStyles();

  const [open] = React.useState(false);

  const isHome = window.location.pathname === "/";
  const [isMounted, setIsMounted] = useState(!isHome);

  useEffect(() => {
    setTimeout(() => {
      setIsMounted(true);
    }, 150);
  }, []);
  return (
    <>
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <div>
            <Hidden smDown>
              {isMounted && (
                <Fade in={true} timeout={{ enter: 2000 }}>
                  <li style={{ listStyle: "none" }}>
                    <IconButton onClick={() => parallax.current.scrollTo(0)}>
                      <Hidden smDown>
                        <img src={logo} className="App-logo" alt="logo" />
                      </Hidden>
                    </IconButton>
                  </li>
                </Fade>
              )}
            </Hidden>
            <Hidden mdUp>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                className={clsx(
                  classes.menuButtonSm,
                  open && classes.menuButtonHidden && classes.title
                )}
                onClick={() => parallax.current.scrollTo(0)}
              >
                <img src={logo} className="App-logo" alt="logo" />
              </IconButton>
            </Hidden>
          </div>
          <Hidden smDown>
            <MainListItems />
          </Hidden>
        </Toolbar>
      </AppBar>
    </>
  );
}
