import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import ScrollToTop from "./components/ScrollToTop";
import ForgotPassword from "./pages/auth/forgotPassword/ForgotPassword";
import ResetPassword from "./pages/auth/resetPassword/ResetPassword";
import Signin from "./pages/auth/signin/Signin";
import Signup from "./pages/auth/signup/Signup";
import Brand from "./pages/brand/Brand";
import Cart from "./pages/cart/Cart";
import Checkout from "./pages/checkout/Checkout";
import Collection from "./pages/collections/collection/Collection";
import Collections from "./pages/collections/Collections";
import Contact from "./pages/etc/contact/Contact";
import Missing from "./pages/etc/missing/Missing";
import Success from "./pages/etc/success/Success";
import UnAuthorized from "./pages/etc/unauthorized/Unauthorized";
import Home from "./pages/home/Home";
import Lookbook from "./pages/lookbooks/lookbook/Lookbook";
import Lookbooks from "./pages/lookbooks/Lookbooks";
import Addresses from "./pages/mypage/addresses/Addresses";
import Mypage from "./pages/mypage/Mypage";
import Profile from "./pages/mypage/profile/Profile";
import Order from "./pages/mypage/orders/order/Order";
import Orders from "./pages/mypage/orders/Orders";
import Product from "./pages/product/Product";
import Search from "./pages/search/Search";
import Shopping from "./pages/shopping/Shopping";
import Stripe from "./pages/stripe/Stripe";
import { ROLES } from "./utils/roleList";
import Reviewables from "./pages/mypage/reviewables/Reviewables";
import Reviews from "./pages/mypage/reviews/Reviews";
import ReviewForm from "./pages/mypage/reviews/submit/ReviewForm";
import Review from "./pages/mypage/reviews/review/Review";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="search/:keyword" element={<Search />} />
          <Route path=":slug/:cid" element={<Shopping />} />
          <Route path="brands/:name" element={<Brand />} />
          <Route path="collections" element={<Collections />} />
          <Route path="collections/:id" element={<Collection />} />
          <Route path="lookbooks" element={<Lookbooks />} />
          <Route path="lookbooks/:id" element={<Lookbook />} />
          <Route path="products/:id" element={<Product />} />
          <Route path="cart" element={<Cart />} />
          <Route path="contact" element={<Contact />} />\
          <Route element={<ProtectedRoute allowedRoles={[ROLES.USER]} />}>
            <Route path="checkout" element={<Checkout />} />
            <Route path="success" element={<Success />} />
            <Route path="mypage/" element={<Mypage />}>
              <Route path="orders" element={<Orders />} />
              <Route path="orders/:id" element={<Order />} />
              <Route path="reviewables" element={<Reviewables />} />
              <Route path="reviews" element={<Reviews />} />
              <Route path="reviews/:id" element={<Review />} />
              <Route path="reviews/submit" element={<ReviewForm />} />
              <Route path="addresses" element={<Addresses />} />
              <Route path="profile" element={<Profile />} />
            </Route>
          </Route>
        </Route>
        <Route element={<ProtectedRoute allowedRoles={[ROLES.USER]} />}>
          <Route path="/stripe" element={<Stripe />} />
        </Route>
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot_password" element={<ForgotPassword />} />
        <Route path="/reset_password/:resetToken" element={<ResetPassword />} />
        <Route path="/unauthorized" element={<UnAuthorized />} />
        <Route path="*" element={<Missing />} />
      </Routes>
    </Router>
  );
}

export default App;
