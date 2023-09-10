import React, { useState, useEffect } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { ServerResponse } from "../context/DataContext";
import useDataManagement from "../hoocks/useDataManagement";
import { useTranslation } from "react-i18next";
import useAddData from "../hoocks/useAddData";

function UrlTable() {
  const { t } = useTranslation();

  const { DataManagement, handleDelete, getData } = useDataManagement();

  const { sendWithID } = useAddData();

  const handleAddClick = () => {
    const url = prompt("Bitte geben Sie die URL ein:");
    if (!url) return;

    const idPrompt = prompt("Bitte geben Sie die ID ein:");

    const idn = idPrompt ? idPrompt.trim() : "";
    sendWithID(idn, url);
  };

  useEffect(() => {
    getData();
  }, [sendWithID]);

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>ID</TableCell>
          <TableCell>URL</TableCell>
          <TableCell>TTL</TableCell>
          <TableCell>{t("createdDate")}</TableCell>
          <TableCell>{t("modifiedDate")}</TableCell>
          <TableCell>
            <Button variant="contained" onClick={handleAddClick}>
              {t("add")}
            </Button>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {DataManagement.map((item) => (
          <TableRow key={item.id}>
            <TableCell>{item.id}</TableCell>
            <TableCell>{item.url}</TableCell>
            <TableCell>{item.ttlInSeconds}</TableCell>
            <TableCell>{item.createdDate}</TableCell>
            <TableCell>{item.modifiedDate}</TableCell>
            <TableCell>
              <IconButton onClick={() => {}}>
                <EditIcon />
              </IconButton>
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
  );
}

export default UrlTable;
