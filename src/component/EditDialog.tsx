import React, { useContext, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Alert,
  TextField,
  Box,
  Snackbar,
  IconButton,
  Tooltip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useTranslation } from "react-i18next";
import DataContext from "../context/DataContext";
import useDataManagement from "../hooks/useDataManagement";
import { isValidURL } from "../features/helpers";

type EditDialogProps = {
  selectedId: string;
};

function EditDialog({ selectedId }: EditDialogProps) {
  const dataContext = useContext(DataContext);
  if (!dataContext) {
    throw new Error("DataContext is not available!");
  }
  const [url, setUrl] = useState<string>("");
  const [ttl, setttl] = useState<number | null>(60);
  const { data } = dataContext;
  const { t } = useTranslation();
  const { handleEdit } = useDataManagement();

  const [open, setOpen] = useState<boolean>(false);

  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);

  const handleUrlCheck = () => {
    if (!isValidURL(url)) {
      setSnackbarOpen(true);
      isValidURL(url);
    }

    return isValidURL(url);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const findElement = (id: string) => {
    data?.map((item) => {
      if (item.id == selectedId) {
        setUrl(item.url);

        setttl(item.ttlInSeconds);
        console.log(ttl);
      }
    });
  };

  return (
    <div>
      <Tooltip title={t("URLEdit")}>
        <IconButton
          onClick={() => {
            handleClickOpen();
            findElement(selectedId);
          }}
        >
          <EditIcon />
        </IconButton>
      </Tooltip>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{t("URLEdit")}</DialogTitle>
        <DialogContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              p: 2,
            }}
          >
            <TextField
              id="id-controlled"
              label={`URL ${t("input")}`}
              type="url"
              value={url}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setUrl(event.target.value);
              }}
              style={{ marginBottom: "16px" }}
            />
            <TextField
              id="TTL-controlled"
              label={`TTL ${t("input")}`}
              type="number"
              value={ttl !== null ? ttl : ""}
              inputProps={{ min: 0 }}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                const value = parseInt(event.target.value, 10);
                if (value > 0) {
                  setttl(value);
                } else {
                  setttl(null);
                }
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={() => {
              handleClose();
            }}
          >
            {t("cancel")}
          </Button>
          <Button
            onClick={() => {
              if (handleUrlCheck()) {
                handleEdit(ttl, url, selectedId);
                handleClose();
              }
            }}
            autoFocus
          >
            Ok
          </Button>
        </DialogActions>
      </Dialog>
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
    </div>
  );
}

export default EditDialog;
