import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import ScrollToTop from "./components/ScrollToTop";
import Brand from "./pages/brands/Brand";
import Cart from "./pages/cart/Cart";
import Category from "./pages/categories/Category";
import Checkout from "./pages/checkout/Checkout";
import Collection from "./pages/collections/Collection";
import Collections from "./pages/collections/Collections";
import Contact from "./pages/contact/Contact";
import ForgotPassword from "./pages/forgotPassword/ForgotPassword";
import Home from "./pages/home/Home";
import Lookbook from "./pages/lookbooks/Lookbook";
import Lookbooks from "./pages/lookbooks/Lookbooks";
import Missing from "./pages/missing/Missing";
import Mypage from "./pages/mypage/Mypage";
import Order from "./pages/orders/Order";
import Orders from "./pages/orders/Orders";
import Product from "./pages/products/Product";
import ResetPassword from "./pages/resetPassword/ResetPassword";
import Search from "./pages/search/Search";
import Signin from "./pages/signin/Signin";
import Signup from "./pages/signup/Signup";
import Success from "./pages/success/Success";
import UnAuthorized from "./pages/unauthorized/Unauthorized";
import { ROLES } from "./utils/roleList";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="search/:keyword" element={<Search />} />
          <Route path=":slug/:cid" element={<Category />} />
          <Route path="brands/:name" element={<Brand />} />
          <Route path="lookbooks" element={<Lookbooks />} />
          <Route path="lookbooks/:id" element={<Lookbook />} />
          <Route path="collections" element={<Collections />} />
          <Route path="collections/:id" element={<Collection />} />
          <Route path="products/:id" element={<Product />} />
          <Route path="cart" element={<Cart />} />
          <Route path="success" element={<Success />} />
          <Route path="contact" element={<Contact />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route element={<ProtectedRoute allowedRoles={[ROLES.USER]} />}>
            <Route path="/mypage" element={<Mypage />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="orders" element={<Orders />} />
            <Route path="orders/:id" element={<Order />} />
          </Route>
        </Route>
        <Route path="/forgot_password" element={<ForgotPassword />} />
        <Route path="/reset_password/:resetToken" element={<ResetPassword />} />
        <Route path="/unauthorized" element={<UnAuthorized />} />
        <Route path="*" element={<Missing />} />
      </Routes>
    </Router>
  );
}

export default App;
