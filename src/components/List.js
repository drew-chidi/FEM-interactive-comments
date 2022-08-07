import React, { useState } from "react";
import Counter from "./Counter";
import CommentForm from "./CommentForm";
import Card from "../UI/Card";
import classes from "./List.module.css";

import { ReactComponent as Reply } from "../assets/icon-reply.svg";

const List = ({ list, id, parentId, onClick }) => {
  const [openReplyForm, setOpenReplyForm] = useState(false);

  // const ctx = useContext(CommentContext);

  // // useEffect(() => {
  // if (parentId !== undefined || parentId !== null) {
  //   ctx.updateParentId(parentId);
  // }
  //   }
  // }, [parentId]);
  console.log("papps", parentId);
  // console.log("List", ctx.parentId);

  // console.log("pruwsyuwyu");
  // const ctx = useContext(CommentContext);
  // if (parentId !== undefined) {
  //   ctx.updateParentId(parentId);
  //   console.log("List, ReplyFormHandler Function", parentId);
  // }
  // console.log("List, ReplyFormHandler Function 2", parentId);

  // console.log(list);
  let image, username;
  if (list.user !== undefined) {
    image = list.user.image.png;
    console.log(image);
    username = list.user.username;
  }

  // const onReplyHandler = (item) => {};

  // const image = false;

  // Shows and Hide the reply form under comments
  const replyFormHandler = () => {
    setOpenReplyForm((current) => !current);
  };

  return (
    <div>
      <Card>
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
          <div className={classes.timeInfo}>
            <p className={classes.time}>{list.createdAt}</p>
          </div>
        </header>
        <main className={classes.mainContainer}>
          <p className={classes.commentBody}>{list.content}</p>
        </main>
        <footer className={classes.commentFooter}>
          <div className={classes.counter}>
            <Counter score={list.score} />
          </div>
          <div className={classes.replyGroup} onClick={replyFormHandler}>
            <p className={classes.reply}>
              <Reply />
            </p>
            <button className={classes.replyButton}>Reply</button>
          </div>
        </footer>
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
