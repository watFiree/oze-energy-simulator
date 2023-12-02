import { useEffect, useRef, useCallback } from "react";
import { useForm, useWatch } from "react-hook-form";
import { TextField } from "@mui/material";
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
      <TextField {...register("var1")} label="var1" variant="outlined" />
      <TextField {...register("var2")} label="var2" variant="outlined" />
    </form>
  );
};
