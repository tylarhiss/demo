import { createSelector } from "reselect";
import { produce } from "immer";

export interface Example2State {
  count: number;
  lock: boolean;
  storedValues: {
    [key: string]: { count: number };
  };
}

const defaultState: Example2State = {
  count: 0,
  lock: false,
  storedValues: {}
};

export enum Example2ActionTypes {
  Increment = "EX2_INC",
  Decrement = "EX2_DEC",
  ChangeLock = "EX2_LOCK_SET",
  StoreCurrentValue = "EX2_STORE_VALUE",
  StoreCurrentValueImmer = "EX2_STORE_VALUE_IMMER"
}

export interface Example2IncrementAction {
  type: Example2ActionTypes.Increment;
}

export interface Example2DecrementAction {
  type: Example2ActionTypes.Decrement;
}

export interface Exampl2ChangeLockAction {
  type: Example2ActionTypes.ChangeLock;
  payload: boolean;
}
export interface Example2StoreCurrentValueAction {
  type: Example2ActionTypes.StoreCurrentValue;
  payload: string;
}

export interface Example2StoreCurrentValueWithImmerAction {
  type: Example2ActionTypes.StoreCurrentValueImmer;
  payload: string;
}

// Action creators
export const example2Increment = (): Example2IncrementAction => ({
  type: Example2ActionTypes.Increment
});
export const example2Decrement = (): Example2DecrementAction => ({
  type: Example2ActionTypes.Decrement
});
export const exampl2ChangeLockAction = (
  lock: boolean
): Exampl2ChangeLockAction => ({
  type: Example2ActionTypes.ChangeLock,
  payload: lock
});
export const example2StoreCurrentValueAction = (
  key: string
): Example2StoreCurrentValueAction => ({
  type: Example2ActionTypes.StoreCurrentValue,
  payload: key
});

export const example2StoreCurrentValueWithImmerAction = (
  key: string
): Example2StoreCurrentValueWithImmerAction => ({
  type: Example2ActionTypes.StoreCurrentValueImmer,
  payload: key
});

export type Example2Actions =
  | Example2IncrementAction
  | Example2DecrementAction
  | Exampl2ChangeLockAction
  | Example2StoreCurrentValueAction
  | Example2StoreCurrentValueWithImmerAction;

export const example2Reducer = (
  state: Example2State = defaultState,
  action: Example2Actions
) => {
  switch (action.type) {
    case Example2ActionTypes.ChangeLock: {
      return { ...state, lock: action.payload };
    }
    case Example2ActionTypes.Increment: {
      if (state.lock) {
        return state;
      }

      return { ...state, count: state.count + 1 };
    }
    case Example2ActionTypes.Decrement: {
      if (state.lock) {
        return state;
      }

      return { ...state, count: state.count - 1 };
    }
    case Example2ActionTypes.StoreCurrentValue: {
      // modifying state.storedValues[key] = {count:#}
      return {
        ...state,
        storedValues: {
          ...state.storedValues,
          [action.payload]: { count: state.count }
        },
        count: 0
      };
    }
    case Example2ActionTypes.StoreCurrentValueImmer: {
      return produce(state, draft => {
        draft.storedValues[action.payload] = { count: draft.count };
        draft.count = 0;
      });
    }

    default: {
      return state;
    }
  }
};

export const ex2BaseSelector = (stateRoot: any): Example2State => stateRoot.ex2;

export const ex2CountSelector = createSelector(ex2BaseSelector, s => s.count);

export const ex2LockSelector = createSelector(ex2BaseSelector, s => s.lock);
