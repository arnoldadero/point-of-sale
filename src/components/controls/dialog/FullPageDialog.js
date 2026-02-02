import React from "react";
import { withStyles } from "@mui/styles";
import { Dialog } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import { Toolbar } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";

const styles = {
  appBar: {
    position: "relative"
  },
  title: {
    flex: 1,
    paddingLeft: "5px",
    fontWeight: 100,
    fontSize: "20px"
  },
  subTitle: {
    paddingLeft: "10px",
    fontWeight: 100,
    fontSize: "16px"
  }
};

const Transition = props => <Slide direction="up" {...props} />;

const FullPageDialog = ({ classes, open, handleClose, children, title }) => (
  <Dialog
    fullScreen
    open={open}
    onClose={handleClose}
    TransitionComponent={Transition}
  >
    <AppBar className={classes.appBar}>
      <Toolbar>
        <span variant="title" color="inherit" className={classes.title}>
          {title}
        </span>
        <IconButton color="inherit" onClick={handleClose} aria-label="Close">
          <CloseIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
    {children}
  </Dialog>
);

export default withStyles(styles)(FullPageDialog);
