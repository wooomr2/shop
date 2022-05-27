import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="users" element={<Users />} />
          <Route path="brands" element={<Brands />} />
          <Route path="brands/:name" element={<Brand />} />
          <Route path="lookbooks" element={<Lookbooks />} />
          <Route path="lookbooks/:id" element={<Lookbook />} />
          <Route path="brands/:name" element={<Brand />} />
          <Route path="screens" element={<Screens />} />
          <Route path="screens/:id" element={<Screen />} />
          <Route path="categories" element={<Categories />} />
          <Route path="products" element={<Products/>} />
          <Route path="products/:slug" element={<Product/>} />
          <Route path="orders" element={<Orders />} />
        </Route>
        <Route path="/signin" element={<Signin />} />
      </Routes>
    </Router>
  );
}

export default App;
