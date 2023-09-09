import React, { createContext, useContext, useState } from "react";
import DataContext, { ServerResponse } from "../context/DataContext";
import { Button, TextField, Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import useAddData from "../hoocks/useAddData";

function InputField() {
  const { t } = useTranslation();

  //Aut
  const username = "abat";
  const password = "5hWDEcFK4FUW";
  const base64 = btoa(username + ":" + password);

  const { url, setUrl, sent } = useAddData(base64);

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
