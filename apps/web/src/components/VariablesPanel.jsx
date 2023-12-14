import { useEffect, useRef, useCallback } from "react";
import { useForm, useWatch } from "react-hook-form";
import { TextField, Typography } from "@mui/material";
import debounce from "lodash.debounce";
import isEqual from "lodash.isequal";

import { useDataProvider } from "../DataProvider/useDataProvider";
import { defaultFormState, debounceDelay } from "./constants";

export const VariablesPanel = () => {
  const { sendMessage } = useDataProvider();
  const { register, control } = useForm();
  const lastSentValues = useRef(null);

  const values = useWatch({
    control,
    defaultValue: defaultFormState,
    exact: false,
  });

  const debouncedSend = useCallback(
    debounce((newValues) => {
      if (!isEqual(newValues, lastSentValues.current)) {
        sendMessage(JSON.stringify(newValues));
        lastSentValues.current = newValues;
      }
    }, debounceDelay),
    [sendMessage]
  );

  useEffect(() => {
    debouncedSend(values);

    return () => {
      debouncedSend.cancel();
    };
  }, [values, debouncedSend]);

  return (
    <form>
      <Typography>Zmienne symulacyjne</Typography>
      <TextField
        {...register("simulationSpeed", { min: 1 })}
        label="Prędkość symulacji (min/1min)"
        variant="outlined"
        type="number"
      />

      <Typography>Zmienne boilera</Typography>
      <TextField
        {...register("expectedTemp", { min: 1 })}
        label="Oczekiwana temperatura (°C)"
        variant="outlined"
        type="number"
      />

      <Typography>Zmienne turbiny</Typography>
      <TextField
        {...register("turbineSpeed", { min: 0 })}
        label="Prędkość wiatru (m/s)"
        variant="outlined"
        type="number"
      />
      <TextField
        {...register("windDensity", { min: 0 })}
        label="Gęstość wiatru (kg/m3)"
        variant="outlined"
        type="number"
      />
      <TextField
        {...register("bladeLength", { min: 0 })}
        label="Długość łopaty (m)"
        variant="outlined"
        type="number"
      />
      <TextField
        {...register("generatorEfficiency", { min: 0, max: 100 })}
        label="Sprawność generatora, przetworników, transformatorów (85%)"
        variant="outlined"
        type="number"
      />
      <TextField
        {...register("mechanicalEfficiency", { min: 0, max: 100 })}
        label="Sprawność mechanicznej przekładni, wirnika i urządzeń pomocniczych (95%)"
        variant="outlined"
        type="number"
      />
      <TextField
        {...register("CpFactor", { min: 0, max: 1 })}
        label="Współczynnik wykorzystania energii wiatru"
        variant="outlined"
        type="number"
        defaultValue={0.593}
      />
      <TextField
        {...register("minWindSpeedToWork", { min: 0 })}
        label="Min. przedział działania turbiny (prędkość wiatru)"
        variant="outlined"
        type="number"
      />
      <TextField
        {...register("maxWindSpeedToWork", { min: 0 })}
        label="Max. przedział działania turbiny (prędkość wiatru)"
        variant="outlined"
        type="number"
      />
      {/*
        A = (π*D2)/4, gdzie D – jest średnicą okręgu omiatanego przez łopaty (czyli dlugosc lopaty*2)
       */}
      {/* 
        https://www.odnawialne-firmy.pl/wiadomosci/pokaz/82,moc-turbiny-wiatrowej-jak-obliczyc#:~:text=W%20praktyce%20jednak%20warto%C5%9B%C4%87%20wsp%C3%B3%C5%82czynnika,4%20%E2%80%93%2025%20m%2Fs.

      */}
    </form>
  );
};
