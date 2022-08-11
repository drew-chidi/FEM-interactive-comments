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
      {ctx.comments?.map((comment) => (
        <div key={comment.id}>
          <List list={comment} parentId={comment.id} id='comment' />
          <div className={classes.replyBox}>
            {comment.replies.map((reply) => (
              <List
                list={reply}
                parentId={comment.id}
                key={reply.id}
                replyId={reply.id}
                name='reply'
              />
            ))}
          </div>
        </div>
      ))}
      {/* <List list={reply} parentId={item.id} /> */}
    </Fragment>
  );
};

export default Comment;
