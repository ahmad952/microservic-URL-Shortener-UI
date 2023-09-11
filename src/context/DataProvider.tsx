import React, { useState } from "react";
import DataContext from "./DataContext";
import { ServerResponse } from "../models/dataTypes";

type DataProviderProps = {
  children: React.ReactNode;
};

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [data, setDataList] = useState<ServerResponse[] | null>(null);

  return (
    <DataContext.Provider value={{ data, setDataList }}>
      {children}
    </DataContext.Provider>
  );
};
