import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import CommentProvider from "./store/CommentProvider";

ReactDOM.render(
  <CommentProvider>
    <App />
  </CommentProvider>,
  document.getElementById("root")
);
