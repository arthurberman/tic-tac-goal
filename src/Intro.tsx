import { useCallback, type FormEvent } from "react";

interface IntroProps {
  dismiss: () => void;
}

const Intro: React.FC<IntroProps> = ({ dismiss }) => {
  const submitGoal = useCallback(
    (event: FormEvent) => {
      event.preventDefault();
      dismiss();
    },
    [dismiss]
  );
  return (
    <div style={{ backgroundColor: "orange", width: "80%", padding: "1vw" }}>
      <form onSubmit={submitGoal}>
        <input
          style={{ width: "90%", height: "5em" }}
          placeholder="What are you doing today?"
        />
      </form>
    </div>
  );
};

export default Intro;
