import * as React from "react";
import "./index.css";
import App from "./App";
import { createRoot } from "react-dom/client";
import CommentProvider from "./store/CommentProvider";
import { ChakraProvider } from "@chakra-ui/react";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <ChakraProvider>
    <CommentProvider>
      <App />
    </CommentProvider>
  </ChakraProvider>
);
