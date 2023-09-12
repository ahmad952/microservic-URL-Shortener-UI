import React, { useState } from "react";
import { Button, TextField, Box, Snackbar, Alert } from "@mui/material";
import { useTranslation } from "react-i18next";
import useAddData from "../hooks/useAddData";
import { isValidURL } from "../features/helpers";
type InputFieldProps = {
  setAutoCreatedId: React.Dispatch<React.SetStateAction<string>>;
};

function InputField({ setAutoCreatedId }: InputFieldProps) {
  const { t } = useTranslation();

  const { url, setUrl, send } = useAddData(setAutoCreatedId);

  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);

  const handleUrlCheck = () => {
    if (!isValidURL(url)) {
      setSnackbarOpen(true);
      isValidURL(url);
    }

    return isValidURL(url);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "start",
        p: 2,
        gap: "16px",
      }}
    >
      <TextField
        id="outlined-controlled"
        type="url"
        label={`URL ${t("input")}`}
        value={url}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setUrl(event.target.value);
        }}
      />
      <Button
        variant="contained"
        onClick={(e) => {
          if (handleUrlCheck()) {
            send(url, e);
          } else {
          }
        }}
      >
        URl {t("shorten")}
      </Button>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity="warning"
          sx={{ width: "100%" }}
        >
          {t("validURL")}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default InputField;
