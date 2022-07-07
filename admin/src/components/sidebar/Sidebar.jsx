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
    <>
    <input type="checkbox" id="nav-toggle" />
    <div className="sidebar">
      <div className="sidebar-brand">
        <div className="sidebar-brand-img">
          <img src="./favicon.ico" alt="icon" />
        </div>
        <h1>HOW ABOUT OOTD</h1>
      </div>

      <div className="sidebar-menu">
        <ul>
          <li>
            <NavLink to="/" className="sidebar-menu-item">
              <DashboardIcon className="icon" />
              <span>Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/users" className="sidebar-menu-item">
              <PersonOutlinedIcon className="icon" />
              <span>Users</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/categories" className="sidebar-menu-item">
              <CategoryIcon className="icon" />
              <span>Categories</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/products" className="sidebar-menu-item">
              <InventoryIcon className="icon" />
              <span>Products</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/brands" className="sidebar-menu-item">
              <InventoryIcon className="icon" />
              <span>Brands</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/lookbooks" className="sidebar-menu-item">
              <InventoryIcon className="icon" />
              <span>Lookbooks</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/collections" className="sidebar-menu-item">
              <InventoryIcon className="icon" />
              <span>Collections</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/orders" className="sidebar-menu-item">
              <LocalGroceryStoreIcon className="icon" />
              <span>Orders</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/delivery" className="sidebar-menu-item">
              <LocalShippingIcon className="icon" />
              <span>Dilivery</span>
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="close"></div>
    </div>
  </>
  );
}

export default Sidebar;
