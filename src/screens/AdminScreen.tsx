import React from "react";
import { useTranslation } from "react-i18next";
import Box from "@mui/material/Box/Box";
import UrlTable from "../component/UrlTable";

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
