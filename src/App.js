import React, { Fragment } from "react";
import classes from "./App.module.css";
import Comment from "./components/Comments/Comment";
import CommentForm from "./components/CommentForm";
import CommentReplies from "./components/Comments/CommentReplies";

function App() {
  return (
    <Fragment>
      <div className={classes.appContainer}>
        <div className={classes.main}>
          <Comment />
          {/* <CommentReplies /> */}
        </div>
        <CommentForm submitLabel='SEND' />
      </div>
    </Fragment>
  );
}

export default App;
