import { HashRouter, BrowserRouter, Routes, Route } from "react-router-dom";
import "./css/App.css";
import Homepage from "./components/pages/Homepage";
import Gamepage from "./components/pages/Gamepage";
import { TargetProvider } from "./contexts/TargetContext";
import Givepage from "./components/pages/Givepage";

function App() {
  return (
    <BrowserRouter>
      <TargetProvider>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/Play" element={<Gamepage />} />
          <Route path="/GiveUp" element={<Givepage/>} />
        </Routes>
      </TargetProvider>
    </BrowserRouter>
  );
}

export default App;