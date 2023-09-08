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
function UrlTable() {
  const [data, setData] = useState<ServerResponse[]>([]);
  //Aut
  const username = "abat";
  const password = "5hWDEcFK4FUW";
  const base64 = btoa(username + ":" + password);

  useEffect(() => {
    fetch("https://urlshortener.smef.io/urls", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + base64,
      },
    })
      .then((response) => response.json())
      .then((data) => setData(data));
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
        {data.map((item) => (
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
              <IconButton onClick={() => {}}>
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
