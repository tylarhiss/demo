import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Example2ActionTypes,
  exampl2ChangeLockAction,
  Example2State,
  example2Increment,
  example2Decrement,
  example2StoreCurrentValueAction,
  ex2BaseSelector,
  ex2CountSelector,
  ex2LockSelector,
  example2StoreCurrentValueWithImmerAction
} from "./example2.store";
import Button from "@material-ui/core/Button";

export const Example2Page = () => {
  const dispatch = useDispatch();
  // leaving selector for the pre tag
  const ex2State = useSelector(ex2BaseSelector);
  const count = useSelector(ex2CountSelector);
  const locked = useSelector(ex2LockSelector);

  const [input, setInput] = useState("#KEYHERE");

  const handleInc = () => {
    dispatch(example2Increment());
  };

  const handleDec = () => {
    dispatch(example2Decrement());
  };

  const handleLock = (lock: boolean) => {
    dispatch(exampl2ChangeLockAction(lock));
  };

  const handleStoreValue = () => {
    dispatch(example2StoreCurrentValueAction(input));
  };

  const handleStoreValueImmer = () => {
    dispatch(example2StoreCurrentValueWithImmerAction(input));
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
          onClick={() => handleLock(!locked)}
        >
          Toggle Lock
        </Button>

        <div className="group">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.currentTarget.value)}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleStoreValue}
          >
            Store value with key
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleStoreValue}
          >
            Use Immer
          </Button>
        </div>
      </div>
      <div className="results">
        <h1>
          Value: {JSON.stringify(count)} is locked {JSON.stringify(locked)}
        </h1>

        <pre>{JSON.stringify(ex2State, undefined, 2)}</pre>
      </div>
    </div>
  );
};
