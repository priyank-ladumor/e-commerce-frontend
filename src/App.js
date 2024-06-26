import Home from "./pages/Home";
import * as React from "react";
import { createRoot } from "react-dom/client";
import Protected from "./Protected"
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  BrowserRouter,
  Routes,
} from "react-router-dom";
import { Outlet, Navigate } from 'react-router-dom'

import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import CheckOut from "./pages/CheckOut";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import LoginVerified from "./pages/LoginVerified";
import RegLogProtected from "./RegLogProtected";
import FilterProductList from "./pages/FilterProductList";
import MyProfilePage from "./pages/Profile";
import MyOrder from "./pages/MyOrder";
import PaymentDone from "./pages/PaymentDone";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route exact path="/products/:topCategory" element={<FilterProductList />} />
          <Route exact path="/products/:topCategory/:secondCategory/:thirdCategory/:id" element={<ProductDetailsPage />} />
          <Route exact path="/user/verified/:token" element={<LoginVerified />} />
          <Route exact path="/payment/success" element={<PaymentDone />} />
          <Route path='/' element={<Protected />}>
            <Route exact path="/cart" element={<Cart />} />
            <Route exact path="/checkout" element={<CheckOut />} />
            <Route exact path="/myprofile" element={<MyProfilePage />} />
            <Route exact path="/myorder" element={<MyOrder />} />
          </Route>
          <Route path='/' element={<RegLogProtected />}>
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
