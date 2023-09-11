import { useState, useEffect, useContext } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import useDataManagement from "../hooks/useDataManagement";
import { useTranslation } from "react-i18next";
import useAddData from "../hooks/useAddData";
import DataContext from "../context/DataContext";
import EditDialog from "./EditDialog";
import { isValidURL } from "../features/helpers";

function UrlTable() {
  const { t } = useTranslation();
  const dataContext = useContext(DataContext);
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [Message, setMessage] = useState<string>("");

  if (!dataContext) {
    throw new Error("DataContext is not available!");
  }

  const { data } = dataContext;

  const { handleDelete, getData, errorMessageM } = useDataManagement();

  const { sendWithID, errorMessageAdd } = useAddData();

  const handleUrlCheck = (url: string) => {
    if (!isValidURL(url)) {
      setSnackbarOpen(true);
      setMessage(t("validURL"));
      isValidURL(url);
    }

    return isValidURL(url);
  };

  const handleAddClick = () => {
    const url = prompt("Bitte geben Sie die URL ein:");
    if (!url) return;

    if (url && handleUrlCheck(url)) {
      const idPrompt = prompt("Bitte geben Sie die ID ein:");
      const idn = idPrompt ? idPrompt.trim() : "";
      sendWithID(idn, url);
      setMessage(errorMessageAdd);
      setMessage(errorMessageM);
    }
  };

  useEffect(() => {
    getData();
  }, [data, getData]);

  useEffect(() => {
    if (errorMessageAdd) {
      setMessage(errorMessageAdd);

      setSnackbarOpen(true);
    } else {
      if (errorMessageM) {
        setMessage(errorMessageM);
        setSnackbarOpen(true);
      }
    }
  }, [errorMessageAdd, errorMessageM]);

  return (
    <div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell style={{ fontWeight: "bold", fontSize: 20 }}>
              ID
            </TableCell>
            <TableCell style={{ fontWeight: "bold", fontSize: 20 }}>
              URL
            </TableCell>
            <TableCell style={{ fontWeight: "bold", fontSize: 20 }}>
              TTL
            </TableCell>
            <TableCell style={{ fontWeight: "bold", fontSize: 20 }}>
              {t("createdDate")}
            </TableCell>
            <TableCell style={{ fontWeight: "bold", fontSize: 20 }}>
              {t("modifiedDate")}
            </TableCell>
            <TableCell>
              <Button variant="contained" onClick={handleAddClick}>
                {t("add")}
              </Button>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.url}</TableCell>
              <TableCell>{item.ttlInSeconds}</TableCell>
              <TableCell>{item.createdDate}</TableCell>
              <TableCell>{item.modifiedDate}</TableCell>
              <TableCell>
                <EditDialog selectedId={item.id} />

                <IconButton
                  onClick={() => {
                    handleDelete(item.id);
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
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
          {Message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default UrlTable;
