import React, { createContext, useContext, useState } from "react";
import DataContext, { ServerResponse } from "../context/DataContext";
import { Button, TextField, Box } from "@mui/material";
import { useTranslation } from "react-i18next";
type Requestbody = {
  url: string;
  ttlInSeconds: number;
};

function InputField() {
  const [url, setUrl] = useState("");
  const dataContext = useContext(DataContext);
  const { t } = useTranslation();

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
    } catch (error) {
      console.error("Fehler:", error);
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="row"
      alignItems="center"
      justifyContent="start"
      p={2}
      style={{ gap: "16px" }}
    >
      <TextField
        id="outlined-controlled"
        label={`URL ${t("input")}`}
        value={url}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setUrl(event.target.value);
        }}
      />
      <Button variant="contained" onClick={sent}>
        URl {t("shorten")}
      </Button>
    </Box>
  );
}

export default InputField;
