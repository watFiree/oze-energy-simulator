import { useDataProvider } from "../../DataProvider/useDataProvider";
import {
  Container,
  EnergyProvidersConatiner,
  PowerDeliveryWithCable,
  Cable,
  Boiler,
  Water,
} from "./styles";
import { roundToSpecifiedPrecision } from "./helpers";

import turbineSVG from "/turbineSVG.svg";
import turbineWindySVG from "/turbineWindySVG.png";
import socketActive from "/socketActive.png";
import socketInactive from "/socketInactive.png";

const PowerDeliveryImageWithCable = ({ imageSrc, isActive }) => (
  <PowerDeliveryWithCable>
    <img style={{ width: 128, height: 128 }} src={imageSrc} />
    <Cable isActive={isActive} />
  </PowerDeliveryWithCable>
);

const SocketPowerComponent = ({ energySource }) => {
  const imageSrc = energySource === "socket" ? socketActive : socketInactive;

  return (
    <PowerDeliveryImageWithCable
      imageSrc={imageSrc}
      isActive={energySource === "socket"}
    />
  );
};

const TurbineComponent = ({ energySource }) => {
  const imageSrc = energySource === "turbine" ? turbineWindySVG : turbineSVG;

  return (
    <PowerDeliveryImageWithCable
      imageSrc={imageSrc}
      isActive={energySource === "turbine"}
    />
  );
};

const BoilerComponent = ({ isHeatingTurnedOn, waterTemperature = 0 }) => {
  return (
    <Boiler>
      <Water isHeatingTurnedOn={isHeatingTurnedOn}>
        <p>{`${roundToSpecifiedPrecision(waterTemperature, 3)} °C`}</p>
      </Water>
    </Boiler>
  );
};

export const SimulationDisplay = () => {
  const { data } = useDataProvider();

  return (
    <div>
      <h1>Simulation Display</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <Container>
        <EnergyProvidersConatiner>
          <TurbineComponent energySource={data.energySource} />
          <SocketPowerComponent energySource={data.energySource} />
        </EnergyProvidersConatiner>
        <BoilerComponent
          isHeatingTurnedOn={data.isWaterHeaterTurnedOn}
          waterTemperature={data.waterTemperature}
        />
      </Container>
    </div>
  );
};
