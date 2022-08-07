import React, { Fragment, useContext } from "react";
import List from "../List";
import CommentContext from "../../store/comment-context";
import classes from "./Comment.module.css";

const Comment = ({ data }) => {
  const ctx = useContext(CommentContext);
  // console.log(ctx.comments);

  // let parentId = ctx.comments.map((item) => item.id);

  return (
    <Fragment>
      {/* {ctx.comments.map((item) => (
        <div key={item.id}>
          <List list={item} parentId={item.id} />
          {item.replies.map((reply) => (
            <CommentReplies reply={reply} key={reply.id} parentId={item.id} />
          ))}
        </div>
      ))} */}
      {ctx.comments?.map((item) => (
        <div key={item.id}>
          <List list={item} parentId={item.id} />
          <div className={classes.replyBox}>
            {item.replies.map((reply) => (
              <List list={reply} parentId={item.id} key={reply.id} />
            ))}
          </div>
        </div>
      ))}
      {/* <List list={reply} parentId={item.id} /> */}
    </Fragment>
  );
};

export default Comment;
