import { useCallback, useRef } from "react";

interface VictoryProps {
  cells: boolean[][];
  ref: React.RefObject<HTMLDialogElement | null>;
  dismiss: () => void;
}

const Victory: React.FC<VictoryProps> = ({ cells, ref, dismiss }) => {
  const rewardRef = useRef<HTMLDivElement>(null);
  const copyReward = useCallback(() => {
    if (!rewardRef.current) {
      return;
    }
    navigator.clipboard.writeText(rewardRef.current.innerText);
  }, [rewardRef]);
  return (
    <dialog
      ref={ref}
      onClose={() => {
        dismiss();
      }}
    >
      <button style={{ justifySelf: "right" }} onClick={dismiss}>
        x
      </button>
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
