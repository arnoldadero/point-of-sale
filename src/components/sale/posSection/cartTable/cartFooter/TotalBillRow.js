import React from "react";
import { withStyles } from "@mui/styles";
import FooterTableCell from "./FooterTableCell";
import FooterTableRow from "./FooterTableRow";

const styles = () => ({
  root: {
    backgroundColor: "#e5e5e5"
  }
});

const TotalBillRow = ({ classes, netTotal }) => (
  <FooterTableRow className={classes.root}>
    <FooterTableCell align="right" style={{ width: "150px" }} />
    <FooterTableCell align="right" />
    <FooterTableCell />
    <FooterTableCell style={{ paddingLeft: "15px" }}>
      Net bill amount
    </FooterTableCell>
    <FooterTableCell align="right">{netTotal}</FooterTableCell>
  </FooterTableRow>
);

export default withStyles(styles)(TotalBillRow);
