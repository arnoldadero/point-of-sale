import React from "react";
import { TableRow, TableHead } from "@mui/material";
import CustomTableCell from "../controls/CustomTableCell";
import DeleteButton from "../controls/DeleteButton";

const CartHeader = ({ isCartEmpty, onDeleteAll }) => (
  <TableHead>
    <TableRow>
      <CustomTableCell style={{ width: 150, textAlign: "center" }}>
        Product
      </CustomTableCell>
      <CustomTableCell align="right">Price</CustomTableCell>
      <CustomTableCell align="right">Qty</CustomTableCell>
      <CustomTableCell align="right">Total</CustomTableCell>
      <CustomTableCell align="right" style={{ width: 30, paddingRight: "5px" }}>
        {!isCartEmpty && <DeleteButton onDelete={onDeleteAll} />}
      </CustomTableCell>
    </TableRow>
  </TableHead>
);

export default CartHeader;
