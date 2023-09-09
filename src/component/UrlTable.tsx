import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { ServerResponse } from "../context/DataContext";
import useDataManagement from "../hoocks/useDataManagement";

function UrlTable() {
  //Aut
  const username = "abat";
  const password = "5hWDEcFK4FUW";
  const base64 = btoa(username + ":" + password);

  const { ModifyData, handleDelete, getData } = useDataManagement(base64);

  useEffect(() => {
    getData();
  }, []);

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>ID</TableCell>
          <TableCell>URL</TableCell>
          <TableCell>TTL</TableCell>
          <TableCell>Erstellungsdatum</TableCell>
          <TableCell>Änderungsdatum</TableCell>
          <TableCell>Aktionen</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {ModifyData.map((item) => (
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
