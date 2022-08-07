import React from "react";

const CommentContext = React.createContext({
  currentUser: {},
  comments: [],
  parentId: null,
  // replies: [],
  updateParentId: (id) => {},
  addComment: (item) => {},
  deleteComment: (id) => {},
  editComment: () => {},
  increaseCount: () => {},
  decreaseCount: () => {},
});

export default CommentContext;
