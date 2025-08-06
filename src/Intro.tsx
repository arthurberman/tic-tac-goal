import { useCallback } from "react";

interface IntroProps {
  dismiss: (text?: String) => void;
}

const Intro: React.FC<IntroProps> = ({ dismiss }) => {
  const submitGoal = useCallback(
    (data: FormData) => {
      var goal = data.get("goal") as String;
      if (goal) dismiss(goal);
      else dismiss();
    },
    [dismiss]
  );
  return (
    <div style={{ backgroundColor: "orange", width: "80%", padding: "1vw" }}>
      <form action={submitGoal}>
        <input
          name="goal"
          style={{ width: "90%", height: "5em" }}
          placeholder="What have you done already today?"
        />
      </form>
    </div>
  );
};

export default Intro;
