import React from "react";
import classes from "./Button.module.css";

const Button = ({ label, onUpdate, ...props }) => {
  const onUpdateHandler = () => {
    onUpdate();
  };

  return (
    <div className={classes.container}>
      <button
        className={classes.button}
        style={{ background: "rgb(81, 81, 166)" }}
        onClick={onUpdateHandler}
      >
        {label}
      </button>
    </div>
  );
};

export default Button;
