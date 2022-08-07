import React, { Fragment, useContext } from "react";
import CommentContext from "./store/comment-context";

import classes from "./App.module.css";
import Comment from "./components/Comments/Comment";
import CommentForm from "./components/CommentForm";
import CommentReplies from "./components/Comments/CommentReplies";
import { v4 as uuidv4 } from "uuid";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";

TimeAgo.addDefaultLocale(en);

function App() {
  // const ctx = useContext(CommentContext);
  // const addCommentHandler = (item) => {
  //   console.log("APP", item);
  //   ctx.addComment({
  //     id: uuidv4(),
  //     content: item,
  //     createdAt: "1 month ago",
  //     score: 12,
  //     user: {
  //       image: ctx.currentUser.image,
  //       username: ctx.currentUser.username,
  //     },
  //     replies: [],
  //   });
  // };

  return (
    <Fragment>
      <div className={classes.appContainer}>
        <div>
          <Comment />
          <CommentReplies />
        </div>
        <CommentForm submitLabel='SEND' />
      </div>
    </Fragment>
  );
}

export default App;
