import { withRouter } from "/src/withRouterCompat";
import React, { Component, Fragment } from "react";
import { List } from "@mui/material";
import {  } from "react-router-dom";
import ListSubheader from "@mui/material/ListSubheader";
import ViewModule from "@mui/icons-material/ViewModule";
import GroupAdd from "@mui/icons-material/GroupAdd";
import SupervisorAccount from "@mui/icons-material/SupervisorAccount";
import NoteAdd from "@mui/icons-material/NoteAdd";
import LocalGroceryStore from "@mui/icons-material/LocalGroceryStore";
import Assessment from "@mui/icons-material/Assessment";
import LocalAtm from "@mui/icons-material/LocalAtm";
import More from "@mui/icons-material/More";
import SidebarMenu from "../../controls/SidebarMenu";

class Menus extends Component {
  state = {};

  isSelected = path =>
    this.props.history.location.pathname === `/${path}` ||
    this.props.history.location.pathname.includes(`/${path}/`);

  onMenuClick = route => {
    this.props.history.push(route);
  };

  render() {
    return (
      <Fragment>
        <List>
          <SidebarMenu
            isSelected={this.isSelected("sale")}
            onClick={() => this.onMenuClick("/sale")}
            text="Sale"
            icon={<ViewModule />}
          />

          <ListSubheader>MASTER</ListSubheader>

          <SidebarMenu
            isSelected={this.isSelected("customers")}
            onClick={() => this.onMenuClick("/customers")}
            text="Customers"
            icon={<GroupAdd />}
          />

          <SidebarMenu
            isSelected={this.isSelected("vendors")}
            onClick={() => this.onMenuClick("/vendors")}
            text="Vendors"
            icon={<SupervisorAccount />}
          />

          <SidebarMenu
            isSelected={
              this.isSelected("products") || this.isSelected("producttypes")
            }
            onClick={() => this.onMenuClick("/products")}
            text="Products"
            icon={<More />}
          />

          <SidebarMenu
            isSelected={
              this.isSelected("expense") || this.isSelected("expensetypes")
            }
            onClick={() => this.onMenuClick("/expense")}
            text="Expense"
            icon={<LocalAtm />}
          />

          <SidebarMenu
            isSelected={this.isSelected("receivings")}
            onClick={() => this.onMenuClick("/receivings")}
            text="Recievings"
            icon={<NoteAdd />}
          />

          <ListSubheader>REPORTS</ListSubheader>
          <SidebarMenu text="Todays Sales" icon={<Assessment />} />
          <SidebarMenu text="Credit Sale" icon={<LocalGroceryStore />} />
          <SidebarMenu text="Expense" icon={<LocalAtm />} />
        </List>
      </Fragment>
    );
  }
}

export default withRouter(Menus);
