import "./sidebar.scss";
import CategoryIcon from "@mui/icons-material/Category";
import DashboardIcon from "@mui/icons-material/Dashboard";
import InventoryIcon from "@mui/icons-material/Inventory";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="top">
        <NavLink to="/" style={{ textDecoration: "none" }}>
          <span className="logo">admin</span>
        </NavLink>
      </div>
      <hr />

      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <li>
            <NavLink to="/" style={{ textDecoration: "none" }}>
              <DashboardIcon className="icon" />
              <span>Dashboard</span>
            </NavLink>
          </li>
          <p className="title">LIST</p>
          <li>
            <NavLink to="/users" style={{ textDecoration: "none" }}>
              <PersonOutlinedIcon className="icon" />
              <span>Users</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/categories" style={{ textDecoration: "none" }}>
              <CategoryIcon className="icon" />
              <span>Categories</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/products" style={{ textDecoration: "none" }}>
              <InventoryIcon className="icon" />
              <span>Products</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/brands" style={{ textDecoration: "none" }}>
              <InventoryIcon className="icon" />
              <span>Brands</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/lookbooks" style={{ textDecoration: "none" }}>
              <InventoryIcon className="icon" />
              <span>Lookbooks</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/collections" style={{ textDecoration: "none" }}>
              <InventoryIcon className="icon" />
              <span>Collections</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/orders" style={{ textDecoration: "none" }}>
              <LocalGroceryStoreIcon className="icon" />
              <span>Orders</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/delivery" style={{ textDecoration: "none" }}>
              <LocalShippingIcon className="icon" />
              <span>Dilivery</span>
            </NavLink>
          </li>
        </ul>
      </div>

      <div className="bottom">
        <div className="colorOption"></div>
        <div className="colorOption"></div>
      </div>
    </div>
  );
}

export default Sidebar;
