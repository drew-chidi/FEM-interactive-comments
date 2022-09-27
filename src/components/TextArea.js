import React, { useContext, useState } from "react";
import classes from "./TextArea.module.css";
import Button from "./UI/Button";
import CommentContext from "../store/comment-context";

const TextArea = ({ content, retrievedItemToEdit, ...props }) => {
  const [editValue, setEditValue] = useState(content);
  const ctx = useContext(CommentContext);
  const editChangeHandler = (e) => {
    setEditValue(e.target.value);
  };

  const editUpdateHandler = () => {
    let formattedContent;
    if (editValue.startsWith("@")) {
      formattedContent = editValue.split(" ").splice(1).join(" ");
    } else {
      formattedContent = editValue;
    }
    retrievedItemToEdit.content = formattedContent;
    ctx.editComment(retrievedItemToEdit);
    props.closeEditing();
  };

  return (
    <>
      <textarea
        className={classes.textArea}
        id='textarea'
        rows='3'
        placeholder='Add a comment...'
        value={editValue}
        onChange={editChangeHandler}
      />
      <Button label={props.submitLabel} onUpdate={editUpdateHandler} />
    </>
  );
};

export default TextArea;
