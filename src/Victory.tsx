import { useRef, type DialogHTMLAttributes } from "react";

interface VictoryProps {
  cells: boolean[][];
  ref: React.RefObject<any>;
}

const Victory: React.FC<VictoryProps> = ({ cells, ref }) => {
  return (
    <dialog ref={ref}>
      <table>
        <tbody>
          {cells.map((cells) => (
            <tr>
              {cells.map((cell) => (
                <td>{cell ? "🟢" : "🟠"}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </dialog>
  );
};
export default Victory;
