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
import TextArea from "./TextArea";

const List = ({ list, replyId, parentId, name }) => {
  const [openReplyForm, setOpenReplyForm] = useState(false);
  const [editData, setEditData] = useState("");
  const [editItem, setEditItem] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const ctx = useContext(CommentContext);
  const comments = ctx.comments;

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

  let retrievedItemToEdit;

  const editHandler = () => {
    setIsEditing(true);
    comments.find((item) => {
      if (item.id === replyId) {
        retrievedItemToEdit = item;
        console.log("it is from here");
      } else {
        retrievedItemToEdit = item.replies.find((item) => item.id === replyId);
      }
      console.log("Withdraw", retrievedItemToEdit);
      return retrievedItemToEdit;
    });

    if (!retrievedItemToEdit.replyingTo) {
      setEditData(`${retrievedItemToEdit.content}`);
    } else {
      setEditData(
        `@${retrievedItemToEdit.replyingTo} ${retrievedItemToEdit.content}`
      );
    }
    setEditItem(retrievedItemToEdit);
  };

  // Set isEditing to False, to be called in a child component
  const isEditingHandler = () => {
    setIsEditing(false);
  };

  // Shows and Hide the reply form under comments
  const replyFormHandler = () => {
    setOpenReplyForm((current) => !current);
  };

  // Set Replying To
  console.log(list);
  let replyingTo = null;
  if (list?.replyingTo) {
    replyingTo = `@${list.replyingTo} `;
  }

  console.log(replyingTo);

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
              {/* Change this paragraph to an input element when edit button is clicked */}
              {!isEditing && (
                <>
                  <p className={classes.replyingTo}>{replyingTo}</p>
                  <p className={classes.content}>{list.content}</p>
                </>
              )}
              {username === "juliusomo" && isEditing && (
                <TextArea
                  content={editData}
                  id={replyId}
                  submitLabel='UPDATE'
                  retrievedItemToEdit={editItem}
                  closeEditing={isEditingHandler}
                />
              )}
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
                {name === "reply" && (
                  <div className={classes.replyGroup} onClick={editHandler}>
                    <button className={classes.replyButton}>
                      <span className={classes.reply}>
                        <EditIcon />
                      </span>
                      Edit
                    </button>
                  </div>
                )}
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
          replyId={replyId}
        />
      )}
    </div>
  );
};

export default List;
