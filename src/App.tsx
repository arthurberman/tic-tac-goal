import { useState } from "react";
import "./App.css";
import Bingo from "./Bingo";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Bingo />
    </>
  );
}

export default App;
