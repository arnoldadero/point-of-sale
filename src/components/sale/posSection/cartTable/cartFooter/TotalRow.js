import React from "react";
import FooterTableCell from "./FooterTableCell";
import FooterTableRow from "./FooterTableRow";

const TotalRow = ({ totalQtyText, totalPrice }) => (
  <FooterTableRow style={{ paddingTop: "20px" }}>
    <FooterTableCell align="right">Total Items</FooterTableCell>
    <FooterTableCell align="right">{totalQtyText}</FooterTableCell>
    <FooterTableCell align="right" />
    <FooterTableCell style={{ paddingLeft: "15px" }}>
      Total{" "}
      <span style={{ fontWeight: "400", fontSize: "11px" }}>(discounted)</span>
    </FooterTableCell>
    <FooterTableCell align="right">{totalPrice}</FooterTableCell>
  </FooterTableRow>
);

export default TotalRow;
