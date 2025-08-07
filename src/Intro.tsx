import { useCallback, useState, type ChangeEvent } from "react";

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

  const [introState, setIntroState] = useState(false);

  const inputChanged = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (event.target.value != "") {
        setIntroState(true);
      } else {
        setIntroState(false);
      }
    },
    [setIntroState]
  );
  const buttonText = introState ? "submit" : "skip";
  return (
    <div style={{ backgroundColor: "orange", width: "80%" }}>
      <form action={submitGoal}>
        <div style={{ display: "inline-flex", padding: "1vh" }}>
          <input
            name="goal"
            style={{ width: "90%", height: "5em" }}
            onChange={inputChanged}
            placeholder="What have you already done today?"
          />
          <input
            type="submit"
            value={buttonText}
            style={{ backgroundColor: "red", height: "5em" }}
          />
        </div>
      </form>
    </div>
  );
};

export default Intro;
