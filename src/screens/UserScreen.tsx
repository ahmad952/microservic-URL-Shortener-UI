import React, { useState } from "react";
import Output from "../component/Output";
import InputField from "../component/InputField";
import Box from "@mui/material/Box/Box";

function UserScreen() {
  const [autoCreatedId, setAutoCreatedId] = useState<string>("");
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "30vh",
        width: "100%",
      }}
    >
      <Box>
        <InputField setAutoCreatedId={setAutoCreatedId} />
        <Output autoCreatedId={autoCreatedId} />
      </Box>
    </Box>
  );
}

export default UserScreen;
