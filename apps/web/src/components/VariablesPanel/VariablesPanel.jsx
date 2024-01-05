import { useEffect } from "react";
import { TextField } from "@mui/material";
import debounce from "lodash.debounce";

import { useDataProvider } from "../../DataProvider/useDataProvider";
import { formKeyWithDefaultValue, formInputsData } from "./constants";
import { Form } from "./styles";

export const VariablesPanel = () => {
  const { sendMessage, status } = useDataProvider();

  useEffect(() => {
    if (status === "connected") {
      sendMessage(JSON.stringify(formKeyWithDefaultValue));
    }
  }, [sendMessage, status]);

  const sendParametersUpdate = debounce((parameterName, value) => {
    if (status === "connected") {
      sendMessage(JSON.stringify({ [parameterName]: value }));
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
            // brakuje walidacji
            sendParametersUpdate(key, Number(e.target.value));
          }}
        />
      ))}

      {/*
        A = (π*D2)/4, gdzie D – jest średnicą okręgu omiatanego przez łopaty (czyli dlugosc lopaty*2)
       */}
      {/* 
        https://www.odnawialne-firmy.pl/wiadomosci/pokaz/82,moc-turbiny-wiatrowej-jak-obliczyc#:~:text=W%20praktyce%20jednak%20warto%C5%9B%C4%87%20wsp%C3%B3%C5%82czynnika,4%20%E2%80%93%2025%20m%2Fs.
      */}
    </Form>
  );
};
