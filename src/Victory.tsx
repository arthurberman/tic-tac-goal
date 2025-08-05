import { useCallback, useRef } from "react";

interface VictoryProps {
  cells: boolean[][];
  ref: React.RefObject<HTMLDialogElement | null>;
}

const Victory: React.FC<VictoryProps> = ({ cells, ref }) => {
  const rewardRef = useRef<HTMLDivElement>(null);
  const copyReward = useCallback(() => {
    if (!rewardRef.current) {
      return;
    }
    navigator.clipboard.writeText(rewardRef.current.innerText);
  }, [rewardRef]);
  return (
    <dialog ref={ref}>
      <div
        className="reward"
        ref={rewardRef}
        style={{ justifyItems: "center" }}
      >
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
        <a href={window.location.href}>{window.location.href}</a>
      </div>
      <button onClick={copyReward}>Copy</button>
    </dialog>
  );
};
export default Victory;
