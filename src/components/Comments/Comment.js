import React, { Fragment, useContext } from "react";
import List from "../List";
import CommentContext from "../../store/comment-context";
import classes from "./Comment.module.css";

const Comment = ({ data }) => {
  const ctx = useContext(CommentContext);

  return (
    <Fragment>
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
    </Fragment>
  );
};

export default Comment;
