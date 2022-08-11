import React, { useReducer, useState } from "react";
import CommentContext from "./comment-context";
import data from "../data.json";

const defaultCommentState = {
  currentUser: data.currentUser,
  comments: data.comments,
};

const commentReducer = (state, action) => {
  switch (action.type) {
    case "COMMENT": {
      let newComment = [action.item, ...state.comments];
      console.log(newComment);
      return {
        currentUser: state.currentUser,
        comments: newComment,
      };
    }
    case "REPLY": {
      let parentId = action.parentId;
      let newComments = state.comments.map((comment) => {
        if (comment.id === parentId) {
          comment.replies.push(action.item);
        }
        return comment;
      });
      return {
        currentUser: state.currentUser,
        comments: newComments,
      };
    }
    case "DELETE": {
      let newComments = state.comments.filter((item) => item.id !== action.id);
      return {
        currentUser: state.currentUser,
        comments: newComments,
      };
    }
    case "DELETEREPLY": {
      let parentId = action.parentId;
      let id = action.id;
      let indexOfReply;
      console.log("ContextDelete1", parentId);
      let newComments = state.comments.map((comment) => {
        if (comment.id === parentId) {
          indexOfReply = comment.replies.findIndex((item) => item.id === id);
          comment.replies.splice(indexOfReply, 1);
        }
        return comment;
      });
      console.log(newComments);
      return {
        currentUser: state.currentUser,
        comments: newComments,
      };
    }
    default: {
      // console.log(action);
      // throw Error("Unknown action: " + action.type);
    }
  }
};

const CommentProvider = (props) => {
  const [commentState, commentAction] = useReducer(
    commentReducer,
    defaultCommentState
  );
  // const [parentId, setParentId] = useState(null);

  const addCommentHandler = (text) => {
    commentAction({ type: "COMMENT", item: text });
  };
  const addReplyHandler = (item, parentId) => {
    commentAction({ type: "REPLY", item: item, parentId: parentId });
  };
  const deleteCommentHandler = (parentId) => {
    commentAction({ type: "DELETE", id: parentId });
  };
  const deleteReplyHandler = (parentId, replyId) => {
    commentAction({ type: "DELETEREPLY", id: replyId, parentId: parentId });
    console.log("Id", replyId);
  };
  // console.log("parentId", parentId);

  const editReplyHandler = (id, item) => {
    commentAction({ type: "EDITREPLY", id: id, item: item });
  };
  // const updateParentId = (item) => {
  //   if (parentId !== undefined || parentId !== null) {
  //     setParentId(item);
  //   }
  // };

  const commentContext = {
    currentUser: commentState.currentUser,
    comments: commentState.comments,
    // parentId: parentId,
    // updateParentId,
    addComment: addCommentHandler,
    addReply: addReplyHandler,
    deleteComment: deleteCommentHandler,
    deleteReply: deleteReplyHandler,
    editComment: () => {},
    increaseCount: () => {},
    decreaseCount: () => {},
  };

  return (
    <CommentContext.Provider value={commentContext}>
      {props.children}
    </CommentContext.Provider>
  );
};

export default CommentProvider;
