import React, { useContext } from "react";
import DataContext from "../context/DataContext";

function Output() {
  const dataContext = useContext(DataContext);
  const url = `https://urlshortener.smef.io/${dataContext?.data?.id || ""}`;

  if (!dataContext || !dataContext.data) {
    return <div>Loading...</div>;
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
  };

  return (
    <div>
      <span> {url}</span>
      <button onClick={handleCopy}>Kopieren</button>
      <a href={url} target="_blank" rel="noopener noreferrer">
        <button>Ausführen</button>
      </a>
    </div>
  );
}

export default Output;
