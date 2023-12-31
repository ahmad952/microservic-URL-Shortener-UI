import { Box } from "@mui/material";
import UrlTable from "../component/UrlTable";

const AdminScreen = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <Box sx={{ width: "900px" }}>
        <UrlTable />
      </Box>
    </Box>
  );
};

export default AdminScreen;
