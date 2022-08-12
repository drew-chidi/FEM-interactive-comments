import React, { useContext, useState } from "react";
import Counter from "./Counter";
import CommentForm from "./CommentForm";
import Card from "./UI/Card";
import classes from "./List.module.css";
import { ReactComponent as Reply } from "../assets/icon-reply.svg";
import { ReactComponent as EditIcon } from "../assets/icon-edit.svg";
import { ReactComponent as DeleteIcon } from "../assets/icon-delete.svg";
import DeleteModal from "./UI/DeleteModal";
import { useDisclosure } from "@chakra-ui/react";
import CommentContext from "../store/comment-context";

const List = ({ list, replyId, parentId, name }) => {
  const [openReplyForm, setOpenReplyForm] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const ctx = useContext(CommentContext);

  console.log("papps1", parentId);
  console.log("papps2", replyId);
  console.log("papps3", name);

  let image, username;
  if (list.user !== undefined) {
    image = list.user.image.png;
    username = list.user.username;
  }

  const deleteHandler = () => {
    if (name === "reply") {
      ctx.deleteReply(parentId, replyId);
    } else {
      ctx.deleteComment(parentId);
    }
    onClose();
  };

  // Shows and Hide the reply form under comments
  const replyFormHandler = () => {
    setOpenReplyForm((current) => !current);
  };

  const editHandler = () => {};

  return (
    <div>
      <DeleteModal onShow={isOpen} onHide={onClose} onDelete={deleteHandler} />
      <Card>
        <div className={classes.container}>
          <div className={classes.headerMain}>
            <header className={classes.headerContainer}>
              <div className={classes.avatarContainer}>
                {image && (
                  <img src={image} alt='images' className={classes.avatar} />
                )}
              </div>
              <div className={classes.usernameBox}>
                {list.user && (
                  <h1 className={classes.username}>{list.user.username}</h1>
                )}
              </div>
              {username === "juliusomo" && (
                <p
                  style={{
                    background: "hsl(238, 40%, 52%)",
                    color: "white",
                    padding: "0 6px",
                    display: "inline-flex",
                    alignItems: "center",
                    fontSize: "12px",
                    borderRadius: "4px",
                  }}
                >
                  you
                </p>
              )}
              <div className={classes.timeInfo}>
                <p className={classes.time}>{list.createdAt}</p>
              </div>
            </header>
            <main className={classes.mainContainer}>
              <p className={classes.commentBody}>{list.content}</p>
            </main>
          </div>
          <footer className={classes.commentFooter}>
            <div className={classes.counter}>
              <Counter score={list.score} />
            </div>
            {username !== "juliusomo" ? (
              <div
                className={`${classes.replyGroup} ${classes.replyGroup2}`}
                onClick={replyFormHandler}
              >
                <span className={classes.reply}>
                  <Reply />
                </span>
                <button className={classes.replyButton}>Reply</button>
              </div>
            ) : (
              <div className={classes.userButtonGroup}>
                <div className={classes.replyGroup} onClick={onOpen}>
                  <span className={classes.reply}>
                    <DeleteIcon />
                  </span>
                  <button className={classes.deleteButton}>Delete</button>
                </div>
                {/* <div className={classes.replyGroup} onClick={editHandler}>
                  <span className={classes.reply}>
                    <EditIcon />
                  </span>
                  <button className={classes.replyButton}>Edit</button>
                </div> */}
              </div>
            )}
          </footer>
        </div>
      </Card>
      {openReplyForm && (
        <CommentForm
          submitLabel='Reply'
          handleToggle={replyFormHandler}
          parentId={parentId}
          image={image}
          username={username}
        />
      )}
    </div>
  );
};

export default List;
