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
  const new_array = [...state.cells];
  const new_state = new_array.find((state: CellState) => state.id == action.id);
  if (!new_state) {
    return state;
  }
  switch (action.type) {
    case "check":
      new_state.status = "checked";
      break;
    case "uncheck":
      new_state.status = "unchecked";
  }
  return { cells: new_array };
}

const verbs = [
  "Sleep",
  "Wonder",
  "Build",
  "Link",
  "Spin",
  "Wiggle",
  "Blunder",
  "Fail",
  "Will",
];
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
