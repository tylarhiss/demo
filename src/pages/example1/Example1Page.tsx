import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Example1ActionTypes,
  Example1ChangeLockAction,
  Example1State
} from "./example1.store";
import Button from "@material-ui/core/Button";

export const Example1Page = () => {
  const dispatch = useDispatch();
  const ex1State: Example1State = useSelector((s: any) => s.ex1);

  const handleInc = () => {
    dispatch({ type: "EX1_INC" });
  };

  const handleDec = () => {
    dispatch({ type: Example1ActionTypes.Decrement });
  };

  const handleLock = (lock: boolean) => {
    const action: Example1ChangeLockAction = {
      type: Example1ActionTypes.ChangeLock,
      payload: lock
    };
    dispatch(action);
  };

  return (
    <div>
      <div
        className="buttons"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <Button variant="contained" color="primary" onClick={handleInc}>
          Increment
        </Button>

        <Button variant="contained" color="primary" onClick={handleDec}>
          Decrement
        </Button>

        <Button
          variant="contained"
          color="primary"
          onClick={() => handleLock(!ex1State.lock)}
        >
          Toggle Lock
        </Button>
      </div>
      <div className="results">
        <h1>
          Value: {JSON.stringify(ex1State.count)} is locked{" "}
          {JSON.stringify(ex1State.lock)}
        </h1>

        <pre>{JSON.stringify(ex1State, undefined, 2)}</pre>
      </div>
    </div>
  );
};
