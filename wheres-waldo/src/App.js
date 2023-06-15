import { HashRouter, BrowserRouter, Routes, Route } from "react-router-dom";
import "./css/App.css";
import Homepage from "./components/pages/Homepage";
import Gamepage from "./components/pages/Gamepage";
import { TargetProvider } from "./contexts/TargetContext";
import Givepage from "./components/pages/Givepage";
import { HitProvider } from "./contexts/ConfirmedHitContext";
import { TimerProvider } from "./contexts/TimerContext";

function App() {
  return (
    <BrowserRouter>
      <TimerProvider>
        <HitProvider>
          <TargetProvider>
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/Play" element={<Gamepage />} />
              <Route path="/GiveUp" element={<Givepage/>} />
            </Routes>
          </TargetProvider>
        </HitProvider>
      </TimerProvider>
    </BrowserRouter>
  );
}

export default App;