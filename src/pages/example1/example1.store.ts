export interface Example1State {
  count: number;
  lock: boolean;
}

const defaultState: Example1State = {
  count: 0,
  lock: false
};

export enum Example1ActionTypes {
  Increment = "EX1_INC",
  Decrement = "EX1_DEC",
  ChangeLock = "EX1_LOCK_SET"
}

export interface Example1IncrementAction {
  type: Example1ActionTypes.Increment;
}

export interface Example1DecrementAction {
  type: Example1ActionTypes.Decrement;
}

export interface Exampl1ChangeLockAction {
  type: Example1ActionTypes.ChangeLock;
  payload: boolean;
}

export type Example1Actions =
  | Example1IncrementAction
  | Example1DecrementAction
  | Exampl1ChangeLockAction;

export const example1Reducer = (
  state: Example1State = defaultState,
  action: Example1Actions
) => {
  switch (action.type) {
    case Example1ActionTypes.ChangeLock: {
      return { ...state, lock: action.payload };
    }
    case Example1ActionTypes.Increment: {
      return { ...state, count: state.count + 1 };
    }
    case Example1ActionTypes.Decrement: {
      return { ...state, count: state.count - 1 };
    }
    default: {
      return state;
    }
  }
};
