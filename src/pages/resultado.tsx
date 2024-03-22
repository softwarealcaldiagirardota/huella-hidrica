import "./WaterFootprintCalculator.css";
import logoAlcaldia from "../assets/logo-girardota.png";
const Resultado = ({
  handleClick,
  data,
}: {
  handleClick: React.Dispatch<React.SetStateAction<string>>;
  data: {
    listrosXweek: number;
    litrosXDay: number;
    m3XDay: number;
  };
}) => {
  return (
    <div className="container-resultado">
      <img
        style={{ height: "100px", width: "300px" }}
        alt="Alcaldia Girardota"
        src={logoAlcaldia}
      />

      <h3>Resultado de Consumo de Agua</h3>

      {/* <div className="card">
        <div className="card-title">Litros consumidos por semana </div>
        <div className="card-result">{data.listrosXweek.toFixed(2)} Litros</div>
      </div>
      <div className="card">
        <div className="card-title">Litros consumidos por día </div>
        <div className="card-result">{data.litrosXDay.toFixed(2)} Litros</div>
      </div> */}
      <div className="card">
        <div className="card-title">Consumo diario en metros cúbicos </div>
        <div className="card-result">{data.m3XDay.toFixed(2)} m³</div>
      </div>

      <button onClick={() => handleClick("home")}>Calcular de nuevo</button>
    </div>
  );
};

export default Resultado;
