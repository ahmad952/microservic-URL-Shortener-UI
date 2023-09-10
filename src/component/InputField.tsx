import React, { createContext, useContext, useState } from "react";
import DataContext, { ServerResponse } from "../context/DataContext";
import { Button, TextField, Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import useAddData from "../hoocks/useAddData";

type InputFieldProps = {
  setCreatedUrlId: React.Dispatch<React.SetStateAction<string>>;
};

function InputField({ setCreatedUrlId }: InputFieldProps) {
  const { t } = useTranslation();

  const { url, setUrl, send } = useAddData(setCreatedUrlId);

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
      <Button variant="contained" onClick={(e) => send(e, url)}>
        URl {t("shorten")}
      </Button>
    </Box>
  );
}

export default InputField;
