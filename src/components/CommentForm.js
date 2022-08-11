import React, { useContext, useState } from "react";
import Card from "./UI/Card";
import { v4 as uuidv4 } from "uuid";
import TimeAgo from "timeago-react";
import classes from "./CommentForm.module.css";
import CommentContext from "../store/comment-context";

// TimeAgo.addDefaultLocale(en);

const CommentForm = ({ parentId, ...props }) => {
  const [text, setText] = useState("");
  const ctx = useContext(CommentContext);
  let image = ctx.currentUser.image.png;
  let username = ctx.currentUser.username;

  const commentData = {
    id: uuidv4(),
    content: text,
    createdAt: <TimeAgo date={new Date()} />,
    // createdAt: "1 month ago",
    score: 12,
    user: {
      image: ctx.currentUser.image,
      username: ctx.currentUser.username,
    },
    replies: [],
  };

  const replyData = {
    id: uuidv4(),
    content: text,
    createdAt: <TimeAgo date={new Date()} />,
    score: 0,
    user: {
      image: ctx.currentUser.image,
      username: username,
    },
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (props.submitLabel === "SEND") {
      ctx.addComment(commentData);
      setText("");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    } else {
      ctx.addReply(replyData, parentId);
      props.handleToggle();
    }
  };

  return (
    <Card>
      <form onSubmit={onSubmitHandler} className={classes.container}>
        <div className={classes.inputBox}>
          <textarea
            className={classes.textArea}
            id='textarea'
            rows='5'
            placeholder='Add a comment...'
            onChange={(e) => setText(e.target.value)}
            value={text}
          />
        </div>
        <div className={classes.buttonAvatar}>
          <div className={classes.userAvatar}>
            <img src={image} alt='user' />
          </div>
          <button
            className={classes.button}
            style={{ background: "rgb(81, 81, 166)" }}
          >
            {props.submitLabel}
          </button>
        </div>
      </form>
    </Card>
  );
};

export default CommentForm;
