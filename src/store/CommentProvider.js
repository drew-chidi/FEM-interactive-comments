import React, { useReducer } from "react";
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
      let newComments = state.comments.map((comment) => {
        if (comment.id === parentId) {
          indexOfReply = comment.replies.findIndex((item) => item.id === id);
          comment.replies.splice(indexOfReply, 1);
        }
        return comment;
      });
      return {
        currentUser: state.currentUser,
        comments: newComments,
      };
    }
    case "EDIT": {
      let id = action.item.id;
      let editedContent;
      state.comments.find((item) => {
        if (item.id === id) {
          editedContent = item;
        } else {
          editedContent = item.replies.find((reply) => reply.id === id);
        }
        return editedContent;
      });
      return {
        currentUser: state.currentUser,
        comments: state.comments,
      };
    }
    default: {
    }
  }
};

const CommentProvider = (props) => {
  const [commentState, commentAction] = useReducer(
    commentReducer,
    defaultCommentState
  );

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

  const editReplyHandler = (item) => {
    commentAction({ type: "EDIT", item: item });
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
    editComment: editReplyHandler,
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
