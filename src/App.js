import Home from "./pages/Home";
import * as React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);


function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
        {/* <Home />
      </RouterProvider> */}
    </div>
  );
}

export default App;
