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



function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>

          <Route index element={<Home />} />
          <Route exact path="/productdetails/:id" element={<ProductDetailsPage />} />
          <Route exact path="/user/verified/:token" element={<LoginVerified />} />
          <Route path='/' element={<Protected />}>
            <Route exact path="/cart" element={<Cart />} />
            <Route exact path="/checkout" element={<CheckOut />} />
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
