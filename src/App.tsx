import { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Display from "./components/Display";
import Information from "./components/Information";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { WebcamProvider } from "./context/WebcamContext";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [predictions, setPredictions] = useState<
    { label: string; score: number }[]
  >([]);

  return (
    <WebcamProvider>
      <div className={`app-container ${darkMode ? "dark-mode" : "light-mode"}`}>
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
        <main className="d-flex flex-column align-items-center justify-content-center flex-grow-1 gap-4 px-3 py-5">
          <Display darkMode={darkMode} setPredictions={setPredictions} />
          <Information predictions={predictions} />
        </main>
        <Footer />
      </div>
    </WebcamProvider>
  );
}

export default App;
