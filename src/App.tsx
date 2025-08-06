import "./App.css";
import Bingo from "./Bingo";
import imgUrl1 from "./assets/No_AI_art.svg";

function App() {
  return (
    <>
      <Bingo />
      <footer>
        <img src={imgUrl1} />
      </footer>
    </>
  );
}

export default App;
