import { HashRouter, BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./components/pages/Homepage";
import Gamepage from "./components/pages/Gamepage";
import { TargetProvider } from "./contexts/TargetContext";

function App() {
  return (
    <BrowserRouter>
      <TargetProvider>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/Play" element={<Gamepage />} />
        </Routes>
      </TargetProvider>
    </BrowserRouter>
  );
}

export default App;