import { useContext } from "react";
import { DataContext } from "./DataProvider";

export const useDataProvider = () => useContext(DataContext);
