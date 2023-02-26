import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Root from "./routes/root";
import Login from "./routes/login";
import { ChakraProvider } from "@chakra-ui/react";
import Course from "./routes/course";
import Account from "./routes/account";
import Video from "./routes/video";
import Admin from "./routes/admin";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/root",
    element: <Root />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/course/:id",
    element: <Course />,
  },
  {
    path: "/account",
    element: <Account />,
  },
  {
    path: "/video/:id",
    element: <Video />,
  },
  {
    path: "/client/admin/",
    element: <Admin />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <ChakraProvider>
    <RouterProvider router={router} />
  </ChakraProvider>
);
