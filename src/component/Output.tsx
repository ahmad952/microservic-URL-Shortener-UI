import { Button, Box } from "@mui/material";
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
      display="flex"
      flexDirection="row"
      alignItems="center"
      justifyContent="start"
      p={2}
      style={{ gap: "16px" }}
    >
      <Box
        component="span"
        sx={{ pl: 1, pr: 1, border: "1px solid  grey" }}
        width={createdUrlId == "" ? 200 : 220}
      >
        <p>{createdUrlId == "" ? t("output") : url}</p>
      </Box>

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
