import React from "react";
import { Button, Box, TextField } from "@mui/material";
import UrlTable from "../component/UrlTable";
import useAddData from "../hoocks/useAddData";
import { useTranslation } from "react-i18next";

const AdminScreen = () => {
  const { t } = useTranslation();

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      width="100%"
    >
      <Box width="800px">
        <UrlTable />
      </Box>
    </Box>
  );
};

export default AdminScreen;
