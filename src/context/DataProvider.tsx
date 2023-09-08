import React, { useState } from "react";
import DataContext from "./DataContext";
import { ServerResponse } from "./DataContext";

type DataProviderProps = {
  children: React.ReactNode;
};

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const serverResponse: ServerResponse = {
    id: "",
    url: "",
    ttlInSeconds: 60,
    createdDate: "",
    expiration: "",
    modifiedDate: "",
  };
  const [data, setData] = useState<ServerResponse | null>(serverResponse);
  return (
    <DataContext.Provider value={{ data, setData }}>
      {children}
    </DataContext.Provider>
  );
};
