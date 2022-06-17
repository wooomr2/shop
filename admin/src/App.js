import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Signin from "./pages/signin/Signin";
import Layout from "./components/Layout";
import Categories from "./pages/categories/Categories";
import Products from "./pages/products/Products";
import Product from "./pages/products/Product";
import Users from "./pages/users/Users";
import Orders from "./pages/orders/Orders";
import Screens from "./pages/screens/Screens";
import Screen from "./pages/screens/Screen";
import Brands from "./pages/brands/Brands";
import Brand from "./pages/brands/Brand";
import Lookbooks from "./pages/lookbooks/Lookbooks";
import Lookbook from "./pages/lookbooks/Lookbook";
import Collections from "./pages/collections/Collections";
import Collection from "./pages/collections/Collection";
import ProtectedRoute from "./components/ProtectedRoute";
import Unauthorized from "./pages/unauthorized/Unauthorized";
import Missing from "./pages/missing/Missing";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route element={<ProtectedRoute />}>
            <Route index element={<Home />} />
            <Route path="users" element={<Users />} />
            <Route path="brands" element={<Brands />} />
            <Route path="brands/:name" element={<Brand />} />
            <Route path="lookbooks" element={<Lookbooks />} />
            <Route path="lookbooks/:id" element={<Lookbook />} />
            <Route path="collections" element={<Collections />} />
            <Route path="collections/:id" element={<Collection />} />
            <Route path="screens" element={<Screens />} />
            <Route path="screens/:id" element={<Screen />} />
            <Route path="categories" element={<Categories />} />
            <Route path="products" element={<Products />} />
            <Route path="products/:slug" element={<Product />} />
            <Route path="orders" element={<Orders />} />
          </Route>
        </Route>

        <Route path="/signin" element={<Signin />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<Missing />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
