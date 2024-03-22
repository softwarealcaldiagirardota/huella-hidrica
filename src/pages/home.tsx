import imagen from "../assets/fondo.jpeg";
import "./WaterFootprintCalculator.css";
const Home = ({
  handleClick,
}: {
  handleClick: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <div onClick={() => handleClick("huella")}>
      <img src={imagen} alt="Fondo" className="background-image" />
    </div>
  );
};

export default Home;
