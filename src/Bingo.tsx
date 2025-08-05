import { useEffect } from "react";
import { useBingo, type BingoState, type CellState } from "./BingoReducer";
import { Cell } from "./Cell";

function checkVictory(state: BingoState, width: number = 3): boolean {
  const victoryMap: boolean[][] = [];
  const mapHeight = state.cells.length / width;
  let i = 0;
  for (let y = 0; y < mapHeight; y++) {
    const row: boolean[] = [];
    for (let x = 0; x < width; x++) {
      if (state.cells[i].status == "checked") {
        row.push(true);
      } else {
        row.push(false);
      }
      i++;
    }

    victoryMap.push(row);
  }
  console.log(victoryMap);
  return false;
}

function Bingo() {
  const width = 3;
  const { state, toggle } = useBingo();

  useEffect(() => {
    try {
      const victory = checkVictory(state, width);
    } catch (_) {}
  }, [state]);

  const formattedCells: CellState[][] = [];
  const mapHeight = state.cells.length / width;

  return (
    <table>
      <tr>
        {state.cells.map((cell) => (
          <td>
            <Cell cell={cell} toggle={toggle} />
          </td>
        ))}
      </tr>
    </table>
  );
}
export default Bingo;
