import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Signin from "./pages/signin/Signin";
import Signup from "./pages/signup/Signup";
import ResetPassword from "./pages/resetPassword/ResetPassword";
import ForgotPassword from "./pages/forgotPassword/ForgotPassword";
import Layout from "./components/Layout";
import Product from "./pages/products/Product";
import Cart from "./pages/cart/Cart";
import Checkout from "./pages/checkout/Checkout";
import Success from "./pages/success/Success";
import Orders from "./pages/orders/Orders";
import Order from "./pages/orders/Order";
import Category from "./pages/categories/Category";
import Brand from "./pages/brands/Brand";
import Brands from "./pages/brands/Brands";
import Lookbooks from "./pages/lookbooks/Lookbooks";
import Lookbook from "./pages/lookbooks/Lookbook";
import ScrollToTop from "./components/ScrollToTop";
import Contact from "./pages/contact/Contact";
import Collections from "./pages/collections/Collections";
import Collection from "./pages/collections/Collection";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path=":slug/:cid" element={<Category />} />
          <Route path="brands" element={<Brands />} />
          <Route path="brands/:name" element={<Brand />} />
          <Route path="lookbooks" element={<Lookbooks />} />
          <Route path="lookbooks/:id" element={<Lookbook />} />
          <Route path="collections" element={<Collections />} />
          <Route path="collections/:id" element={<Collection />} />
          <Route path="products/:id" element={<Product />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="orders" element={<Orders />} />
          <Route path="orders/:id" element={<Order />} />
          <Route path="success" element={<Success />} />
          <Route path="contact" element={<Contact />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
        <Route path="/forgot_password" element={<ForgotPassword />} />
        <Route path="/reset_password/:resetToken" element={<ResetPassword />} />
      </Routes>
    </Router>
  );
}

export default App;
