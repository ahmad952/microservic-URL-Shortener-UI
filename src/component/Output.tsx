import { Button, Box, Paper } from "@mui/material";
import { useTranslation } from "react-i18next";

type OutputProps = {
  autoCreatedId: string;
};

function Output({ autoCreatedId }: OutputProps) {
  const url = `https://urlshortener.smef.io/${autoCreatedId}`;
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
        elevation={autoCreatedId === "" ? 0 : 3}
        sx={{
          pl: 1,
          pr: 1,
          border: autoCreatedId ? "1px solid black" : "1px solid #d3d3d3",
          color: autoCreatedId ? "black" : "grey",
          width: !autoCreatedId ? 205 : 220,
        }}
      >
        <p>{!autoCreatedId ? t("output") : url}</p>
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
