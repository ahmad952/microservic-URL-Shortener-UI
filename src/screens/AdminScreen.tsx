import { Box } from "@mui/material";
import UrlTable from "../component/UrlTable";

const AdminScreen = () => {
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
