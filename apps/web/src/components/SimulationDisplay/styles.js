import styled from "@emotion/styled";

export const Container = styled.div`
  display: flex;
`;

export const EnergyProvidersConatiner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
`;

export const PowerDeliveryWithCable = styled.div`
  display: flex;
  align-items: center;
`;

export const Cable = styled.div`
  width: 5rem;
  height: 0.5rem;

  background-color: ${(props) => (props.isActive ? "lightgreen" : "lightgrey")};
  border-top: 0.1rem solid black;
  border-bottom: 0.1rem solid black;
`;

export const Boiler = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  height: 20rem;
  width: 12rem;
  overflow: hidden;

  background-color: #808589;
  border-radius: 20% 20% 20% 20% / 10% 10% 10% 10%;
  color: white;
  font-size: 2rem;
  font-weight: bold;
  border: 0.1rem solid #808589;
`;

export const Water = styled.div`
  width: 100%;
  height: 75%;
  background-color: #74ccf4;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  --size: 26px;
  --p: 24px;
  --R: 35.72px; /*sqrt(var(--size)*var(--size) + var(--p)*var(--p))*/

  -webkit-mask: radial-gradient(
        var(--R) at left 50% var(--d, top) calc(var(--size) + var(--p)),
        #000 99%,
        #0000 101%
      )
      calc(50% - 2 * var(--size)) 0 / calc(4 * var(--size)) 100%,
    radial-gradient(
        var(--R) at left 50% var(--d, top) calc(-1 * var(--p)),
        #0000 99%,
        #000 101%
      )
      left 50% var(--d, top) var(--size) / calc(4 * var(--size)) 100% repeat-x;

  p {
    z-index: 1;
  }

  ${(props) =>
    props.isHeatingTurnedOn &&
    `
          &::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: red;
            opacity: 0.3;
          }
        `}
`;
