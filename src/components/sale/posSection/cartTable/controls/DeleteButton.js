import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { withStyles } from "@mui/styles";
import { IconButton } from "@mui/material";

const styles = () => ({
  deleteIcon: {
    color: "#949494"
  }
});

const DeleteButton = ({ onDelete, classes }) => (
  <IconButton onClick={() => onDelete()}>
    <DeleteIcon className={classes.deleteIcon} />
  </IconButton>
);

export default withStyles(styles)(DeleteButton);
