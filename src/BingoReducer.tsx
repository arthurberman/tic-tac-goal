import { useCallback, useReducer } from "react";

export interface CellState {
  id: number;
  text: String;
  status: "checked" | "unchecked" | "new";
}

export interface BingoState {
  cells: CellState[];
}

interface BingoAction {
  type: "check" | "uncheck";
  id: number;
}

function bingoReducer(state: BingoState, action: BingoAction): BingoState {
  const newArray = [...state.cells];
  const newState = newArray.find((state: CellState) => state.id == action.id);
  if (!newState) {
    return state;
  }
  switch (action.type) {
    case "check":
      newState.status = "checked";
      break;
    case "uncheck":
      newState.status = "unchecked";
  }
  return { cells: newArray };
}

const verbs = [
  "Sleep Well",
  "Blunder",
  "Be Curious",
  "Build",
  "Connect",
  "Care",
  "Move",
  "Fail",
  "Will",
];

function recoverStorage(state: BingoState): BingoState {
  var newState = { ...state };

  return newState;
}
export function useBingo() {
  const cells: CellState[] = [];
  for (const [index, verb] of verbs.entries()) {
    cells.push({ id: index, text: verb, status: "new" });
  }
  const [state, dispatch] = useReducer(bingoReducer, { cells });
  const check = useCallback((id: number) => {
    dispatch({ type: "check", id });
  }, []);
  const uncheck = useCallback((id: number) => {
    dispatch({ type: "uncheck", id });
  }, []);

  const toggle = useCallback(
    (id: number) => {
      const elem = state.cells.find((s) => s.id == id);
      if (!elem) {
        return;
      }
      if (elem.status == "checked") {
        uncheck(elem.id);
      } else {
        check(elem.id);
      }
    },
    [state]
  );
  return { state, check, uncheck, toggle };
}
