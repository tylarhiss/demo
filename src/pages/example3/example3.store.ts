import { createSelector } from "reselect";
import { createAction, createReducer, PayloadAction } from "@reduxjs/toolkit";
import { wait } from "util/wait";

export interface Example3State {
  count: number;
  lock: boolean;
  working: boolean;
  storedValues: {
    [key: string]: { count: number };
  };
}

const defaultState: Example3State = {
  count: 0,
  lock: false,
  storedValues: {},
  working: false
};
export const example3IncrementAction = createAction("ex3/increment");
export const example3DecrementAction = createAction("ex3/decrement");
export const example3ToggleLocAction = createAction<boolean>("ex3/toggle lock");
export const example3SaveValueAction = createAction<string>("ex3/save value");
export const example3SetWorkingAction = createAction<boolean>("ex3/working");

export const incrementAfter1Second = () => async (dispatch: any) => {
  dispatch(example3SetWorkingAction(true));
  await wait(1000);
  dispatch(example3SetWorkingAction(false));

  dispatch(example3IncrementAction());

  // can even return values here..
  // maybe return api response if caller cares to look at it
  return 1000;
};

export const incrementAfter1SecondAndThrow = () => async (dispatch: any) => {
  dispatch(example3SetWorkingAction(true));
  await wait(1000);
  dispatch(example3SetWorkingAction(false));

  throw new Error("error in thunk");
};

export const example3Reducer = createReducer(defaultState, {
  [example3IncrementAction.type]: state => {
    state.count = state.count + 1;
  },
  [example3DecrementAction.type]: state => {
    state.count = state.count - 1;
  },
  [example3ToggleLocAction.type]: (state, action: PayloadAction<boolean>) => {
    state.lock = action.payload;
  },
  [example3SaveValueAction.type]: (state, action: PayloadAction<string>) => {
    state.storedValues[action.payload] = { count: state.count };
    state.count = 0;
  },
  [example3SetWorkingAction.type]: (state, action: PayloadAction<boolean>) => {
    state.working = action.payload;
  }
});

export const ex3BaseSelector = (stateRoot: any): Example3State => {
  return stateRoot.ex3;
};

export const ex3CountSelector = createSelector(ex3BaseSelector, s => s.count);

export const ex3LockSelector = createSelector(ex3BaseSelector, s => s.lock);

export const ex3IsWorking = createSelector(ex3BaseSelector, s => s.working);
