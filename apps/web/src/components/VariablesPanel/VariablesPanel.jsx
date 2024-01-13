import { useEffect } from "react";
import { Button, TextField } from "@mui/material";
import debounce from "lodash.debounce";

import { useDataProvider } from "../../DataProvider/useDataProvider";
import { formKeyWithDefaultValue, formInputsData } from "./constants";
import { Form } from "./styles";

export const VariablesPanel = () => {
  const { sendData, startSimulation, pauseSimulation, isRunning, status } =
    useDataProvider();

  useEffect(() => {
    if (status === "connected") {
      sendData(formKeyWithDefaultValue);
    }
  }, [sendData, status]);

  const sendParametersUpdate = debounce((parameterName, value) => {
    if (status === "connected") {
      sendData({ [parameterName]: value });
    }
  }, 300);

  return (
    <Form>
      {formInputsData.map(({ key, label, defaultValue, variant, type }) => (
        <TextField
          key={key}
          label={label}
          defaultValue={defaultValue}
          variant={variant}
          type={type}
          onChange={(e) => {
            sendParametersUpdate(key, Number(e.target.value));
          }}
        />
      ))}

      <Button
        variant="contained"
        onClick={isRunning ? pauseSimulation : startSimulation}
      >
        {isRunning ? "Wstrzymaj" : "Symuluj"}
      </Button>
    </Form>
  );
};
