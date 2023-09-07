import { format } from "date-fns";
import React, { createContext, useContext, useState } from "react";
import DataContext, { ServerResponse } from "../context/DataContext";

type Requestbody = {
  url: string;
  ttlInSeconds: number;
};

function App() {
  const [url, setUrl] = useState("");
  const dataContext = useContext(DataContext);

  if (!dataContext) {
    throw new Error("App must be wrapped with DataProvider");
  }

  const { data, setData } = dataContext;

  //Aut
  const username = "abat";
  const password = "5hWDEcFK4FUW";
  const base64 = btoa(username + ":" + password);

  const sent = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const body: Requestbody = {
      url,
      ttlInSeconds: 60,
    };

    try {
      const response = await fetch("https://urlshortener.smef.io/urls", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Basic " + base64,
        },

        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error("Netzwerkantwort war nicht ok.");
      }
      const data1: ServerResponse = await response.json();
      setData(data1); // Hier benutzt du setData

      console.log(data1);
      console.log(data1.id);
      console.log(format(new Date(data1.createdDate), "dd.MM.yyyy HH:mm:ss"));
    } catch (error) {
      console.error("Fehler:", error);
    }
  };

  return (
    <div>
      <input
        type="url"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="URl eingeben"
        required
      />
      <button type="button" onClick={sent}>
        URl verkürzen
      </button>
    </div>
  );
}

export default App;
