import React from "react";
import Output from "../component/Output";
import InputField from "../component/InputField";
import Box from "@mui/material/Box/Box";

function UserScreen() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="30vh"
      width="100%"
    >
      <Box>
        <InputField />
        <Output />
      </Box>
    </Box>
  );
}

export default UserScreen;
