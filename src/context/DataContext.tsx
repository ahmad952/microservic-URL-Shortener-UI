import React, { createContext } from "react";

export type ServerResponse = {
  id: string;
  url: string;
  ttlInSeconds: number;
  expiration: string;
  createdDate: string;
  modifiedDate: string;
};

type DataContextType = {
  data: ServerResponse | null;
  setData: React.Dispatch<React.SetStateAction<ServerResponse | null>>;
};

const DataContext = createContext<DataContextType | undefined>(undefined);

export default DataContext;
