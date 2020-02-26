import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ex3CanAddMoreToCountSelector,
  ex3CanRemovedFromCountSelector,
  ex3CanLockSelector
} from "./example3.settings.store";
import {
  ex3BaseSelector,
  ex3CountSelector,
  ex3LockSelector,
  example3IncrementAction,
  example3DecrementAction,
  example3ToggleLocAction,
  example3SaveValueAction,
  incrementAfter1Second,
  ex3IsWorking,
  incrementAfter1SecondAndThrow
} from "./example3.store";
import Button from "@material-ui/core/Button";
import { useThunkDispatch } from "store";

export const Example3Page = () => {
  const dispatch = useThunkDispatch();
  // leaving selector for the pre tag
  const ex3State = useSelector(ex3BaseSelector);
  const count = useSelector(ex3CountSelector);
  const locked = useSelector(ex3LockSelector);
  const canIncrement = useSelector(ex3CanAddMoreToCountSelector);
  const canDecrement = useSelector(ex3CanRemovedFromCountSelector);
  const canLock = useSelector(ex3CanLockSelector);
  const isWorking = useSelector(ex3IsWorking);

  const [input, setInput] = useState("#KEYHERE");

  const handleInc = () => {
    dispatch(example3IncrementAction());
  };

  const handleDec = () => {
    dispatch(example3DecrementAction());
  };

  const handleLock = (lock: boolean) => {
    dispatch(example3ToggleLocAction(lock));
  };

  const handleStoreValue = () => {
    dispatch(example3SaveValueAction(input));
  };

  const handleThunk = () => {
    dispatch(incrementAfter1Second()).then(value => {
      console.log("page can react after thunk completes" + value);
    });
  };

  const errorThunk = () => {
    dispatch(incrementAfter1SecondAndThrow()).catch((e: any) => {
      console.log(`caught ${e.message}`);
    });
  };

  if (isWorking) {
    return <h1>PLEASE WAIT WHILE GETTING VALUE FROM SERVER</h1>;
  }

  return (
    <div>
      <div
        className="buttons"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={handleInc}
          disabled={!canIncrement}
        >
          Increment
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleThunk}
          disabled={!canIncrement}
        >
          Increment Thunk (1ms)
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={errorThunk}
          disabled={!canIncrement}
        >
          Increment Thunk (1ms) Error
        </Button>

        <Button
          variant="contained"
          color="primary"
          onClick={handleDec}
          disabled={!canDecrement}
        >
          Decrement
        </Button>

        <Button
          variant="contained"
          color="primary"
          disabled={!canLock}
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
        </div>
      </div>
      <div className="results">
        <h1>
          Value: {JSON.stringify(count)} is locked {JSON.stringify(locked)}
        </h1>

        <pre>{JSON.stringify(ex3State, undefined, 2)}</pre>
      </div>
    </div>
  );
};
