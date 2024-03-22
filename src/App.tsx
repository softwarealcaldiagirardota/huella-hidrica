import React from "react";
import logo from "./logo.svg";
import "./App.css";
import WaterFootprintCalculator from "./pages/calculator";
import Home from "./pages/home";
import Resultado from "./pages/resultado";

function App() {
  const [page, setPage] = React.useState("home");
  const [data, setData] = React.useState({
    listrosXweek: 0,
    litrosXDay: 0,
    m3XDay: 0,
  });
  return (
    <div className="App">
      {page === "huella" && (
        <WaterFootprintCalculator handleClick={setPage} data={setData} />
      )}

      {page === "home" && <Home handleClick={setPage} />}

      {page === "resultado" && <Resultado handleClick={setPage} data={data} />}
    </div>
  );
}

export default App;
