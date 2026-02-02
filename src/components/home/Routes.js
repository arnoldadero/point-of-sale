import React from "react";
import { Routes as Switch, Route } from "react-router-dom";
import Customer from "../customers";
import Expense from "../expense";
import Receivings from "../receivings";
import Product from "../products";
import Vendor from "../vendor";
import Sale from "../sale";
import NotFound from "../notFound/NotFound";

const Routes = () => (
  <Switch style={{ overflow: "auto" }}>
    <Route path="/" element={<div />} />

    {/* Sale */}
    <Route path="/sale" element={<Sale />} />

    {/* Receivings */}
    <Route path="/receivings" element={<Receivings.Receivings />} />
    <Route path="/receivings/new" element={<Receivings.AddNew />} />

    {/* Vendor */}
    <Route path="/vendors" element={<Vendor.Vendors />} />
    <Route path="/vendors/new" element={<Vendor.AddNew />} />
    <Route path="/vendors/edit/:id" element={<Vendor.AddNew />} />

    {/* Customer */}
    <Route path="/customers" element={<Customer.Customers />} />
    <Route path="/customers/new" element={<Customer.AddNew />} />
    <Route path="/customers/edit/:id" element={<Customer.AddNew />} />

    {/* Expense */}
    <Route path="/expense" element={<Expense.Expense />} />
    <Route path="/expense/new" element={<Expense.AddNewExpense />} />
    <Route path="/expense/edit/:id" element={<Expense.AddNewExpense />} />

    {/* Expense Type */}
    <Route path="/expensetypes" element={<Expense.Expense />} />
    <Route
      path="/expensetypes/new"
      element={<Expense.AddNewExpenseType />}
    />
    <Route
      path="/expensetypes/edit/:id"
      element={<Expense.AddNewExpenseType />}
    />

    {/* Product */}
    <Route path="/products" element={<Product.Products />} />
    <Route path="/products/new" element={<Product.AddNewProduct />} />
    <Route path="/products/edit/:id" element={<Product.AddNewProduct />} />

    {/* Product Type */}
    <Route path="/producttypes" element={<Product.Products />} />
    <Route
      path="/producttypes/new"
      element={<Product.AddNewProductType />}
    />
    <Route
      path="/producttypes/edit/:id"
      element={<Product.AddNewProductType />}
    />

    {/* Catch : Not found */}
    <Route path="*" element={<NotFound />} />
  </Switch>
);

export default Routes;
