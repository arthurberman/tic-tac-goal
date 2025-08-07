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
  type: "check" | "uncheck" | "change";
  id: number;
  text?: String;
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
      break;
    case "change":
      if (action.text) newState.text = action.text;
      break;
  }
  return { cells: newArray };
}

const verbs = [
  "Do a crazy dance",
  "Read the room",
  "Go all out",
  "Conserve Resources",
  "Beat the Odds",
  "Spin",
  "Make it Fast",
  "Freeze!",
  "Find the fun",
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
  const change = useCallback((id: number, text: String) => {
    dispatch({ type: "change", id, text });
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
  return { state, change, check, uncheck, toggle };
}
