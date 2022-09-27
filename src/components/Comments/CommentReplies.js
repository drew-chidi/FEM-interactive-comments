import classes from "./Comment.module.css";
import List from "../List";

const CommentReplies = ({ parentId, reply }) => {
  return (
    <div>
      <div className={classes.replyBox}>
        <div>
          <div>
            {reply !== undefined ? (
              <List list={reply} parentId={parentId} />
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentReplies;
