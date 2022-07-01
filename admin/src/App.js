import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import Brand from "./pages/brands/Brand";
import Brands from "./pages/brands/Brands";
import Categories from "./pages/categories/Categories";
import Chat from "./pages/chat/Chat";
import Collection from "./pages/collections/Collection";
import Collections from "./pages/collections/Collections";
import Missing from "./pages/etc/missing/Missing";
import Unauthorized from "./pages/etc/unauthorized/Unauthorized";
import Home from "./pages/home/Home";
import Lookbook from "./pages/lookbooks/Lookbook";
import Lookbooks from "./pages/lookbooks/Lookbooks";
import Order from "./pages/orders/Order";
import Orders from "./pages/orders/Orders";
import Product from "./pages/products/Product";
import Products from "./pages/products/Products";
import Signin from "./pages/signin/Signin";
import User from "./pages/users/User";
import Users from "./pages/users/Users";
import { ROLES } from "./utils/roleList";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<ProtectedRoute allowedRoles={[ROLES.ADMIN]} />}>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="users" element={<Users />} />
            <Route path="users/:id" element={<User />} />
            <Route path="brands" element={<Brands />} />
            <Route path="brands/:name" element={<Brand />} />
            <Route path="lookbooks" element={<Lookbooks />} />
            <Route path="lookbooks/:id" element={<Lookbook />} />
            <Route path="collections" element={<Collections />} />
            <Route path="collections/:id" element={<Collection />} />
            <Route path="categories" element={<Categories />} />
            <Route path="products" element={<Products />} />
            <Route path="products/:slug" element={<Product />} />
            <Route path="orders" element={<Orders />} />
            <Route path="orders/:id" element={<Order />} />
            <Route path="chat" element={<Chat />} />
          </Route>
        </Route>

        <Route path="/signin" element={<Signin />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<Missing />} />
      </Routes>
    </Router>
  );
}

export default App;
