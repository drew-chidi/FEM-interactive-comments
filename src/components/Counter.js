import React, { useState } from "react";
import { ReactComponent as Add } from "../assets/icon-plus.svg";
import { ReactComponent as Minus } from "../assets/icon-minus.svg";
import classes from "./Counter.module.css";

const Counter = ({ score }) => {
  const [count, setCount] = useState(score);

  const increaseCountHandler = () => {
    setCount((current) => current + 1);
  };
  const decreaseCountHandler = () => {
    if (count === 0) {
      return;
    }
    setCount((current) => current - 1);
  };
  return (
    <div className={classes.countContainer}>
      <button onClick={increaseCountHandler} className={classes.addCount}>
        <Add />
      </button>
      <div className={classes.count}>{count}</div>
      <button onClick={decreaseCountHandler} className={classes.minusCount}>
        <Minus />
      </button>
    </div>
  );
};

export default Counter;
