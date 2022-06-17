import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar/Sidebar";
import Header from "./header/Header";
import "./layout.css";

function Layout() {
  return (
    <div className="layout">
      <aside>
        <Sidebar />
      </aside>
      <main>
        <Header />
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
