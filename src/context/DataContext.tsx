import React, { createContext } from "react";
import { ServerResponse } from "../models/dataTypes";

type DataContextType = {
  data: ServerResponse[] | null;
  setDataList: React.Dispatch<React.SetStateAction<ServerResponse[] | null>>;
};

const DataContext = createContext<DataContextType | undefined>(undefined);

export default DataContext;
