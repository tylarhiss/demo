import React from "react";
import { createSelector } from "reselect";
import { Example1State } from "pages/example1/example1.store";
import { ex3CountSelector } from "pages/example3/example3.store";
import { ex2CountSelector } from "pages/example2/example2.store";
import { useSelector } from "react-redux";

const ex1Selector = (s: any): Example1State => s.ex1;

const allCounts = createSelector(
  [ex1Selector, ex2CountSelector, ex3CountSelector],
  (ex1State, ex2Count, ex3Count) => {
    return ex1State.count + ex2Count + ex3Count;
  }
);

export const FinalPage = () => {
  const allCountValue = useSelector(allCounts);

  return (
    <div>
      Current Count of all current counts: {JSON.stringify(allCountValue)}
      <ul>
        <li>
          <a href="https://redux.js.org/">Redux docs</a>
        </li>
        <li>
          <a href="https://ngrx.io/docs">NGRX (Angular)</a>
        </li>
      </ul>
    </div>
  );
};
