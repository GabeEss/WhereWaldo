import { HashRouter, Routes, Route } from "react-router-dom";
import "./css/App.css";
import Homepage from "./components/pages/Homepage";
import Gamepage from "./components/pages/Gamepage";
import Scorepage from "./components/pages/Scorepage";
import { TargetProvider } from "./contexts/TargetContext";
import Givepage from "./components/pages/Givepage";
import { HitProvider } from "./contexts/ConfirmedHitContext";
import { TimerProvider } from "./contexts/TimerContext";
import { GameOverProvider } from "./contexts/GameoverContext";
import { ScoreProvider } from "./contexts/FinalScoreContext";

function App() {
  return (
    <HashRouter>
      <ScoreProvider>
        <GameOverProvider>
          <TimerProvider>
            <HitProvider>
              <TargetProvider>
                <Routes>
                  <Route path="/" element={<Homepage />} />
                  <Route path="/Play" element={<Gamepage />} />
                  <Route path="/GiveUp" element={<Givepage/>} />
                  <Route path="/Scores" element={<Scorepage/>} />
                </Routes>
              </TargetProvider>
            </HitProvider>
          </TimerProvider>
        </GameOverProvider>
        </ScoreProvider>
    </HashRouter>
  );
}

export default App;