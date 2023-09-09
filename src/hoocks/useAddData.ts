import { useState,useContext } from 'react'
import DataContext, { ServerResponse } from '../context/DataContext';

type Requestbody = {
    url: string;
    ttlInSeconds: number;
  };

function useAddData(base64 :string) {
 
 const [url,setUrl]= useState("")
 const dataContext = useContext(DataContext);

 if (!dataContext) {
  throw new Error("DataContext is not available!");
}

const { data, setData } = dataContext;

 const sent = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const body: Requestbody = {
      url,
      ttlInSeconds: 60,
    };

    try {
      const response = await fetch("https://urlshortener.smef.io/urls", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Basic " + base64,
        },

        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error("Netzwerkantwort war nicht ok.");
      }
      const data1: ServerResponse = await response.json();
      setData(data1)

      console.log(data1);
      console.log(data1.id);
    } catch (error) {
      console.error("Fehler:", error);
    }
  };




 return {url,setUrl,sent}

}

export default useAddData