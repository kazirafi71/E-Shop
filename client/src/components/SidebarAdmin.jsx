import {
  Box,
  Container,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
} from "@material-ui/core";
import React from "react";
import InboxIcon from "@material-ui/icons/Inbox";
import EventIcon from "@material-ui/icons/Event";
import GroupIcon from "@material-ui/icons/Group";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import "./SidebarAdmin.css";
import { Link } from "react-router-dom";
import ListAltIcon from '@material-ui/icons/ListAlt';

const SidebarAdmin = () => {
  return (
    <div className="position-fixed border sidebar__style">
      <List className="text-light">
        <Link className="text-decoration-none" to="/admin/add-category">
          <ListItem button>
            <ListItemIcon className='text-light'>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText
              className="text-light list__style"
              primary="Add Category"
            />
          </ListItem>
        </Link>
        <Link className="text-decoration-none" to="/admin/add-product">
          <ListItem button>
            <ListItemIcon className='text-light'>
              <EventIcon />
            </ListItemIcon>
            <ListItemText
              className="text-light list__style"
              primary="Add Product"
            />
          </ListItem>
        </Link>
        <Link className="text-decoration-none" to="/admin/view-products">
          <ListItem button>
            <ListItemIcon className='text-light'>
              <ListAltIcon/>
            </ListItemIcon>
            <ListItemText
              className="text-light list__style"
              primary="View Products"
            />
          </ListItem>
        </Link>
        <Link className='text-decoration-none' to="/admin/view-orders">
          <ListItem button>
            <ListItemIcon className='text-light'>
              <BorderColorIcon />
            </ListItemIcon>
            <ListItemText className="text-light list__style" primary="Orders" />
          </ListItem>
        </Link>
        <Link className="text-decoration-none" to="/admin/users">
          <ListItem button>
            <ListItemIcon className='text-light'>
              <GroupIcon />
            </ListItemIcon>
            <ListItemText className="text-light list__style" primary="Users" />
          </ListItem>
        </Link>
      </List>
    </div>
  );
};

export default SidebarAdmin;
