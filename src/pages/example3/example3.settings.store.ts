import { createReducer, createSelector } from "@reduxjs/toolkit";
import { ex3CountSelector } from "./example3.store";

export interface Example3SettingsState {
  maxAmount: number;
  minAmount: number;
  canLock: boolean;
}

const defaultSettingsState: Example3SettingsState = {
  maxAmount: 10,
  minAmount: 0,
  canLock: false
};

export const example3SettingsReducer = createReducer(defaultSettingsState, {});

export const ex3SettingsBaseSelector = (
  stateRoot: any
): Example3SettingsState => stateRoot.ex3Settings;

export const ex3MaxAmountSelector = createSelector(
  ex3SettingsBaseSelector,
  s => s.maxAmount
);

export const ex3MinAmountSelector = createSelector(
  ex3SettingsBaseSelector,
  s => s.minAmount
);

export const ex3CanLockSelector = createSelector(
  ex3SettingsBaseSelector,
  s => s.canLock
);

// COMBINED SELECTORS

export const ex3CanAddMoreToCountSelector = createSelector(
  [ex3CountSelector, ex3MaxAmountSelector],
  (currentCount, maxCount) => {
    return currentCount < maxCount;
  }
);

export const ex3CanRemovedFromCountSelector = createSelector(
  [ex3CountSelector, ex3MinAmountSelector],
  (currentCount, minCount) => {
    return currentCount > minCount;
  }
);
