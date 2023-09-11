import { Button, Box, Paper } from "@mui/material";
import { useTranslation } from "react-i18next";

type OutputProps = {
  createdUrlId: string;
};

function Output({ createdUrlId }: OutputProps) {
  const url = `https://urlshortener.smef.io/${createdUrlId}`;
  const { t } = useTranslation();
  const handleCopy = () => {
    navigator.clipboard.writeText(url);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "start",
        p: 2,
        gap: 2,
      }}
    >
      <Paper
        elevation={createdUrlId === "" ? 0 : 3}
        sx={{
          pl: 1,
          pr: 1,
          border: createdUrlId !== "" ? "1px solid black" : "1px solid #d3d3d3",
          color: createdUrlId !== "" ? "black" : "grey",
          width: createdUrlId === "" ? 205 : 220,
        }}
      >
        <p>{createdUrlId === "" ? t("output") : url}</p>
      </Paper>

      <Button variant="contained" onClick={handleCopy}>
        {t("copy")}
      </Button>
      <a href={url} target="_blank" rel="noopener noreferrer">
        <Button variant="contained">{t("execute")}</Button>
      </a>
    </Box>
  );
}

export default Output;
