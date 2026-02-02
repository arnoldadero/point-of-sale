import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { withStyles } from "@mui/styles";
import Header from "./header/Header";
import Sidebar from "./sidebar/Sidebar";
import MainContainer from "../controls/MainContainer";
import Routes from "./Routes";

// eslint-disable-next-line
const styles = theme => ({
  root: {
    zIndex: 1,
    // overflow: "auto",
    display: "flex",
    // width: "100%",
    height: "calc(100vh - 1px)", // TODO needs to figure why. For now its a hack :)
    borderBottom: "1px solid #e0e0e0"
  }
});

const Home = (props) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { classes } = props;

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const shouldRenderMobileMenu = location.pathname === "/sale";

  return (
    <div className={classes.root}>
      <Header
        shouldRenderMobileMenu={shouldRenderMobileMenu}
        handleDrawerToggle={handleDrawerToggle}
      />
      <Sidebar
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
      />
      <MainContainer shouldRenderMobileMenu={shouldRenderMobileMenu}>
        <Routes />
      </MainContainer>
    </div>
  );
};

export default withStyles(styles, { withTheme: true })(Home);
