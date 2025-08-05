import type { CellState } from "./BingoReducer";

interface CellProps {
  cell: CellState;
  toggle: (id: number) => void;
}

export const Cell: React.FC<CellProps> = ({ cell, toggle }) => {
  function clickCheck(_: any) {
    toggle(cell.id);
  }
  return (
    <button
      type="button"
      onClick={clickCheck}
      style={{
        backgroundColor: cell.status == "checked" ? "greenyellow" : "orange",
      }}
    >
      {cell.text}
    </button>
  );
};
