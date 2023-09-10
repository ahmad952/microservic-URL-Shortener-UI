import React, { useState } from "react";
import Output from "../component/Output";
import InputField from "../component/InputField";
import Box from "@mui/material/Box/Box";

function UserScreen() {
  const [createdUrlId, setCreatedUrlId] = useState("");
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
        <InputField setCreatedUrlId={setCreatedUrlId} />
        <Output createdUrlId={createdUrlId} />
      </Box>
    </Box>
  );
}

export default UserScreen;
