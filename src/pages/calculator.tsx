import React, { useEffect, useState } from "react";
import "./WaterFootprintCalculator.css";
import logoAlcaldia from "../assets/logo-girardota.png";

const semanasEnUnAno = 52;
const semanasEnunMes = 4.5;
const mil = 1000;
const fields = {
  waterConsumption: { defaultValue: 0 },
  cereals: { defaultValue: 0, litrosXunidad: 1000 },
  beef: { defaultValue: 0, litrosXunidad: 15000 },
  pork: { defaultValue: 0, litrosXunidad: 5988 },
  poultry: { defaultValue: 0, litrosXunidad: 4325 },
  seafood: { defaultValue: 0, litrosXunidad: 925 },
  legumes: { defaultValue: 0, litrosXunidad: 5053 },
  eggs: { defaultValue: 0, litrosXunidad: 200 },
  dairyProducts: { defaultValue: 0, litrosXunidad: 1020 },
  vegetables: { defaultValue: 0, litrosXunidad: 773 },
  fruits: { defaultValue: 0, litrosXunidad: 967 },
  tubers: { defaultValue: 0, litrosXunidad: 287 },
  coffeeCupsWeekly: { defaultValue: 0, litrosXunidad: 140 },
  aromaticCupsWeekly: { defaultValue: 0, litrosXunidad: 35 },
  shoesPairs: { defaultValue: 0, litrosXunidad: 4400 },
  shirtsCount: { defaultValue: 0, litrosXunidad: 1200 },
  pantsCount: { defaultValue: 0, litrosXunidad: 10800 },
  cellphones: { defaultValue: 0, litrosXunidad: 23200 },
  televisions: { defaultValue: 0, litrosXunidad: 136000 },
  computers: { defaultValue: 0, litrosXunidad: 37800 },
  usesPublicTransport: { defaultValue: 0, litrosXunidad: 0.1 },
  privateVehicle: { defaultValue: 0, litrosXunidad: 246000 },
};

const divisionSegura = (divisor: any, dividendo: number) =>
  divisor !== 0 ? dividendo / divisor : 0;

const WaterFootprintCalculator = ({
  handleClick,
  data,
}: {
  handleClick: React.Dispatch<React.SetStateAction<string>>;
  data: React.Dispatch<React.SetStateAction<any>>;
}) => {
  const [formData, setFormData] = useState({
    waterConsumption: "",
    personCount: "",
    cereals: "",
    beef: "",
    pork: "",
    poultry: "",
    seafood: "",
    legumes: "",
    eggs: "",
    dairyProducts: "",
    vegetables: "",
    fruits: "",
    tubers: "",
    coffeeCupsWeekly: "",
    aromaticCupsWeekly: "",
    shoesPairs: "",
    shoesPairsDuration: "",
    shirtsCount: "",
    shirtsCountDuration: "",
    pantsCount: "",
    pantsCountDuration: "",
    cellphones: "",
    cellphonesDuration: "",
    televisions: "",
    televisionsDuration: "",
    computers: "",
    computersDuration: "",
    usesPublicTransport: "No",
    usesPublicTransportOften: "",
    privateVehicle: "No",
    privateVehicleOften: "",
  });
  const [huellas, setHuellas] = useState({
    listrosXweek: 0,
    litrosXDay: 0,
    m3XDay: 0,
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    if (name === "usesPublicTransport" || name === "privateVehicle") {
      setFormData({ ...formData, [name]: value });
      return;
    }

    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    let sumaHuella = 0;
    let semanasPorAno = 0;
    Object.entries(fields).forEach(([key, value]) => {
      //@ts-ignore
      let curentValue = Number(formData[key]);
      //@ts-ignore
      const litrosXunidad = value.litrosXunidad;

      switch (key) {
        case "waterConsumption":
          const persons = Number(formData["personCount"]);
          sumaHuella +=
            persons !== 0 ? (curentValue * mil) / persons / semanasEnunMes : 0;
          break;
        case "shoesPairs":
          semanasPorAno =
            semanasEnUnAno * Number(formData["shoesPairsDuration"]);
          sumaHuella += divisionSegura(
            semanasPorAno,
            curentValue * litrosXunidad
          );
          break;
        case "shirtsCount":
          semanasPorAno =
            semanasEnUnAno * Number(formData["shirtsCountDuration"]);
          sumaHuella += divisionSegura(
            semanasPorAno,
            curentValue * litrosXunidad
          );
          break;
        case "pantsCount":
          semanasPorAno =
            semanasEnUnAno * Number(formData["pantsCountDuration"]);
          sumaHuella += divisionSegura(
            semanasPorAno,
            curentValue * litrosXunidad
          );
          break;
        case "cellphones":
          semanasPorAno =
            semanasEnUnAno * Number(formData["cellphonesDuration"]);
          sumaHuella += divisionSegura(
            semanasPorAno,
            curentValue * litrosXunidad
          );
          break;
        case "televisions":
          semanasPorAno =
            semanasEnUnAno * Number(formData["televisionsDuration"]);
          sumaHuella += divisionSegura(
            semanasPorAno,
            curentValue * litrosXunidad
          );
          break;
        case "computers":
          semanasPorAno =
            semanasEnUnAno * Number(formData["computersDuration"]);
          sumaHuella += divisionSegura(
            semanasPorAno,
            curentValue * litrosXunidad
          );
          break;
        case "usesPublicTransport":
          if (formData["usesPublicTransport"] === "Sí") {
            sumaHuella +=
              Number(formData["usesPublicTransportOften"]) * litrosXunidad;
          }
          break;
        case "privateVehicle":
          if (formData["privateVehicle"] === "Sí") {
            sumaHuella +=
              Number(formData["privateVehicleOften"]) * litrosXunidad;
          }
          break;
        default:
          sumaHuella += curentValue * litrosXunidad;
          break;
      }

      semanasPorAno = 0;
    });
    setHuellas({
      listrosXweek: sumaHuella,
      litrosXDay: (sumaHuella * 52) / 365,
      m3XDay: (sumaHuella * 52) / 365 / 1000,
    });
  };

  useEffect(() => {
    if (huellas.listrosXweek !== 0) {
      data(huellas);
      handleClick("resultado");
    }
  }, [huellas]);

  useEffect(() => {
    data({ listrosXweek: 0, litrosXDay: 0, m3XDay: 0 });
  }, []);

  return (
    <div className="calculator-container">
      <img
        style={{ height: "100px", width: "300px" }}
        alt="Alcaldia Girardota"
        src={logoAlcaldia}
      />
      <h2>Secretaría de Ambiente y Sostenibilidad</h2>
      <h3>Calculadora de Huella Hídrica</h3>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>Según tu factura de servicios</legend>
          <label htmlFor="waterConsumption">Consumo de agua (m3/mes)</label>
          <input
            required
            type="number"
            id="waterConsumption"
            name="waterConsumption"
            value={formData.waterConsumption}
            onChange={handleInputChange}
          />
          <div>
            <label htmlFor="personCount">
              ¿Cuantas personas viven contigo?
            </label>
            <input
              required
              type="number"
              id="personCount"
              name="personCount"
              value={formData.personCount}
              onChange={handleInputChange}
            />
          </div>
        </fieldset>

        <fieldset>
          <legend>Consumo de alimentos</legend>
          <label htmlFor="cereals">
            Cereales como trigo, arroz, maíz, etc. (Kg/semana)
          </label>
          <input
            required
            type="number"
            id="cereals"
            name="cereals"
            value={formData.cereals}
            onChange={handleInputChange}
          />
          <div>
            <label htmlFor="beef">Carne de Res (Kg/semana)</label>
            <input
              required
              type="number"
              id="beef"
              name="beef"
              value={formData.beef}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="pork">Carne de Cerdo (Kg/semana)</label>
            <input
              required
              type="number"
              id="pork"
              name="pork"
              value={formData.pork}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="poultry">Pollo y otras aves (Kg/semana)</label>
            <input
              type="number"
              id="poultry"
              name="poultry"
              value={formData.poultry}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="seafood">Pescados y mariscos (Kg/semana)</label>
            <input
              required
              type="number"
              id="seafood"
              name="seafood"
              value={formData.seafood}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="legumes">
              Leguminosas como lentejas, frijoles, garbanzos, etc. (Kg/semana)
            </label>
            <input
              required
              type="number"
              id="legumes"
              name="legumes"
              value={formData.legumes}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="dairyProducts">Productos lácteos (Kg/semana)</label>
            <input
              required
              type="number"
              id="dairyProducts"
              name="dairyProducts"
              value={formData.dairyProducts}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="vegetables">Verduras (Kg/semana)</label>
            <input
              required
              type="number"
              id="vegetables"
              name="vegetables"
              value={formData.vegetables}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="fruits">Frutas (Kg/semana)</label>
            <input
              required
              type="number"
              id="fruits"
              name="fruits"
              value={formData.fruits}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="tubers">
              Tubérculos como patatas, yuca (Kg/semana)
            </label>
            <input
              required
              type="number"
              id="tubers"
              name="tubers"
              value={formData.tubers}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="eggs">Huevos (Cantidad/semana)</label>
            <input
              type="number"
              id="eggs"
              name="eggs"
              value={formData.eggs}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="aromaticCupsWeekly">
              ¿Cuántas tazas de aromática tomas a la semana?
            </label>
            <input
              required
              type="number"
              id="aromaticCupsWeekly"
              name="aromaticCupsWeekly"
              value={formData.aromaticCupsWeekly}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="coffeeCupsWeekly">
              ¿Cuántas tazas de café tomas a la semana?
            </label>
            <input
              required
              type="number"
              id="coffeeCupsWeekly"
              name="coffeeCupsWeekly"
              value={formData.coffeeCupsWeekly}
              onChange={handleInputChange}
            />
          </div>
        </fieldset>
        <fieldset>
          <legend>Zapatos</legend>
          <label htmlFor="shoesPairs">¿Cuántos pares de zapatos tienes?</label>
          <input
            required
            type="number"
            id="shoesPairs"
            name="shoesPairs"
            value={formData.shoesPairs}
            onChange={handleInputChange}
          />
          <div>
            <label htmlFor="shoesPairsDuration">
              ¿Cuántos años te suelen durar los zapatos?
            </label>
            <input
              required
              type="number"
              id="shoesPairsDuration"
              name="shoesPairsDuration"
              value={formData.shoesPairsDuration}
              onChange={handleInputChange}
            />
          </div>
        </fieldset>
        <fieldset>
          <legend>Camisas, camisetas, blusas</legend>
          <label htmlFor="shirtsCount">
            ¿Cuántos camisas, camisetas, blusas tienes?
          </label>
          <input
            required
            type="number"
            id="shirtsCount"
            name="shirtsCount"
            value={formData.shirtsCount}
            onChange={handleInputChange}
          />
          <div>
            <label htmlFor="shirtsCountDuration">
              ¿Cuántos años te suelen durar las camisas, camisetas, blusas?
            </label>
            <input
              required
              type="number"
              id="shirtsCountDuration"
              name="shirtsCountDuration"
              value={formData.shirtsCountDuration}
              onChange={handleInputChange}
            />
          </div>
        </fieldset>
        <fieldset>
          <legend>Pantalones o jeans</legend>
          <label htmlFor="pantsCount">
            ¿Cuántos pantalones o jeans tienes?
          </label>
          <input
            required
            type="number"
            id="pantsCount"
            name="pantsCount"
            value={formData.pantsCount}
            onChange={handleInputChange}
          />
          <div>
            <label htmlFor="pantsCountDuration">
              ¿Cuántos años te suelen durar los pantalones o jeans?
            </label>
            <input
              required
              type="number"
              id="pantsCountDuration"
              name="pantsCountDuration"
              value={formData.pantsCountDuration}
              onChange={handleInputChange}
            />
          </div>
        </fieldset>

        <fieldset>
          <legend>Aparatos electrónicos</legend>
          <label htmlFor="cellphones">¿Cuántos celulares tienes?</label>
          <input
            required
            type="number"
            id="cellphones"
            name="cellphones"
            value={formData.cellphones}
            onChange={handleInputChange}
          />
          <div>
            <label htmlFor="cellphonesDuration">
              ¿Con qué frecuencia en años cambias de celular?
            </label>
            <input
              required
              type="number"
              id="cellphonesDuration"
              name="cellphonesDuration"
              value={formData.cellphonesDuration}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="televisions">¿Cuántos televisores tienes?</label>
            <input
              required
              type="number"
              id="televisions"
              name="televisions"
              value={formData.televisions}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="televisionsDuration">
              ¿Con qué frecuencia en años cambias de televisor?
            </label>
            <input
              required
              type="number"
              id="televisionsDuration"
              name="televisionsDuration"
              value={formData.televisionsDuration}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="computers">¿Cuántos computadores tienes?</label>
            <input
              required
              type="number"
              id="computers"
              name="computers"
              value={formData.computers}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="computersDuration">
              ¿Con qué frecuencia en años cambias de computador?
            </label>
            <input
              required
              type="number"
              id="computersDuration"
              name="computersDuration"
              value={formData.computersDuration}
              onChange={handleInputChange}
            />
          </div>
        </fieldset>
        <fieldset>
          <legend>Medios de transporte</legend>
          <div className="radio-container">
            <p>¿Utilizas transporte público regularmente?</p>
            <label>
              <input
                type="radio"
                name="usesPublicTransport"
                value="Sí"
                checked={formData.usesPublicTransport === "Sí"}
                onChange={handleInputChange}
              />
              Sí
            </label>
            <label>
              <input
                type="radio"
                name="usesPublicTransport"
                value="No"
                checked={formData.usesPublicTransport === "No"}
                onChange={handleInputChange}
              />
              No
            </label>
          </div>
          <div style={{ marginTop: "0.5rem" }}>
            <label htmlFor="usesPublicTransportOften">
              ¿Con qué frecuencia usas el transporte público a la semana?
            </label>
            <input
              type="number"
              id="usesPublicTransportOften"
              name="usesPublicTransportOften"
              value={formData.usesPublicTransportOften}
              onChange={handleInputChange}
            />
          </div>

          <div className="radio-container">
            <p>¿Tienes vehículo propio?</p>
            <label>
              <input
                type="radio"
                name="privateVehicle"
                value="Sí"
                checked={formData.privateVehicle === "Sí"}
                onChange={handleInputChange}
              />
              Sí
            </label>
            <label>
              <input
                type="radio"
                name="privateVehicle"
                value="No"
                checked={formData.privateVehicle === "No"}
                onChange={handleInputChange}
              />
              No
            </label>
          </div>
          <div style={{ marginTop: "0.5rem" }}>
            <label htmlFor="privateVehicleOften">
              ¿Con qué frecuencia usas tu vehículo a la semana?
            </label>
            <input
              type="number"
              id="privateVehicleOften"
              name="privateVehicleOften"
              value={formData.privateVehicleOften}
              onChange={handleInputChange}
            />
          </div>
        </fieldset>
        <button type="submit">Calcular</button>
      </form>
    </div>
  );
};

export default WaterFootprintCalculator;
