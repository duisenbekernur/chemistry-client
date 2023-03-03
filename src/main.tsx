import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import Router from "./Router";
import Footer from "./components/Footer";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    <ChakraProvider>
      <Router />
      <Footer />
    </ChakraProvider>
  </BrowserRouter>
);
