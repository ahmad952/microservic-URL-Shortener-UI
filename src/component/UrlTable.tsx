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

function UrlTable() {
  const [data, setData] = useState<ServerResponse[]>([]);
  //Aut
  const username = "abat";
  const password = "5hWDEcFK4FUW";
  const base64 = btoa(username + ":" + password);

  const handleSort = (data: ServerResponse[]) => {
    const sortedData = data.sort((a, b) => {
      if (a.id < b.id) {
        return -1;
      }
      if (a.id > b.id) {
        return 1;
      }
      return 0;
    });

    setData(sortedData);
  };

  useEffect(() => {
    fetch("https://urlshortener.smef.io/urls", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + base64,
      },
    })
      .then((response) => response.json())
      .then((data) => handleSort(data));
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`https://urlshortener.smef.io/urls/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Basic " + base64,
        },
      });
      if (response.ok) {
        const newData = data.filter((item) => item.id !== id);
        handleSort(newData);
      } else {
        console.error(`Failed to delete item with ID ${id}.`);
      }
    } catch (error) {
      console.error("There was an error deleting the item:", error);
    }
  };

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
