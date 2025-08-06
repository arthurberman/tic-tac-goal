import { useCallback, useEffect, useRef, useState } from "react";
import "./Bingo.css";
import { useBingo, type BingoState, type CellState } from "./BingoReducer";
import { Cell } from "./Cell";
import Intro from "./Intro";
import Victory from "./Victory";

function mapVictory(state: BingoState, width: number = 3) {
  const victoryMap: boolean[][] = [];
  const mapHeight = state.cells.length / width;
  let i = 0;
  for (let y = 0; y < mapHeight; y++) {
    const row: boolean[] = [];
    for (let x = 0; x < width; x++) {
      if (i >= state.cells.length) {
        continue;
      }
      if (state.cells[i].status == "checked") {
        row.push(true);
      } else {
        row.push(false);
      }
      i++;
    }

    victoryMap.push(row);
  }
  return { victoryMap, mapHeight };
}

function checkVictory(state: BingoState, width: number = 3): boolean {
  const { victoryMap, mapHeight } = mapVictory(state);
  // check rows:
  for (const row of victoryMap) {
    if (row.every((cell: boolean) => cell)) {
      return true;
    }
  }
  // check columns:
  for (let x = 0; x < width; x++) {
    if (victoryMap.every((row) => row[x])) {
      return true;
    }
  }
  // check diagonals
  let diagonalSolution = true;
  for (let diagonal = 0; diagonal < width && diagonal < mapHeight; diagonal++) {
    if (!victoryMap[diagonal][diagonal]) diagonalSolution = false;
  }
  if (diagonalSolution) {
    return true;
  }
  diagonalSolution = true;
  for (let diagonal = 0; diagonal < width && diagonal < mapHeight; diagonal++) {
    if (!victoryMap[diagonal][width - diagonal - 1]) diagonalSolution = false;
  }
  if (diagonalSolution) {
    return true;
  }
  return false;
}

function Bingo() {
  const width = 3;
  const { state, toggle } = useBingo();

  const dialogRef = useRef<HTMLDialogElement>(null);
  const [winState, setWin] = useState(false);
  const [intro, setIntro] = useState(true);

  useEffect(() => {
    const victory = checkVictory(state, width);
    setWin(victory);
  }, [state]);
  useEffect(() => {
    if (winState) {
      if (!dialogRef.current) {
        return;
      }
      dialogRef.current.showModal();
    }
  }, [winState, state]);

  var dismissIntro = useCallback(() => {
    setIntro(false);
  }, [setIntro]);
  const formattedCells: CellState[][] = [];
  const mapHeight = state.cells.length / width;
  for (let y = 0; y < mapHeight; y++) {
    formattedCells.push(state.cells.slice(y * width, y * width + width));
  }

  return (
    <div style={{ justifyItems: "center" }}>
      <h1>Tic-Tac-Goal</h1>
      {intro && <Intro dismiss={dismissIntro} />}
      {winState && (
        <Victory ref={dialogRef} cells={mapVictory(state, width).victoryMap} />
      )}
      <table className={intro ? "HiddenBingo" : "ReadyBingo"}>
        <tbody>
          {formattedCells.map((cells) => (
            <tr>
              {cells.map((cell) => (
                <td>
                  <Cell key={cell.id} cell={cell} toggle={toggle} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default Bingo;
