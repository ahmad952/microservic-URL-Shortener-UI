import { useState,useContext } from 'react'
import DataContext, { ServerResponse } from '../context/DataContext';

type RequestBody = {
    url: string;
    ttlInSeconds: number;
  };

function useAddData(setCreatedUrlId: React.Dispatch<React.SetStateAction<string>> = () => {}) {
 
 const [url,setUrl]= useState<string>("")
 const dataContext = useContext(DataContext);
 if (!dataContext) {
  throw new Error("DataContext is not available!");
}
 
const { setData } = dataContext;

  
//Aut
const username = process.env.REACT_APP_USERNAME;
const password = process.env.REACT_APP_PASSWORD;
const base64 = btoa(username + ":" + password);




const  addToServer = async(id:string, url:string) =>{

  
  const body: RequestBody = {
    url,
    ttlInSeconds: 60,
  };

  const apiUrl= id === "" ? "https://urlshortener.smef.io/urls" :  `https://urlshortener.smef.io/urls/${id}`;

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + base64,
      },

      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error("Netzwerkantwort war nicht ok.");
    }      const data1: ServerResponse = await response.json();

     if(id == ""){
      console.log("Bedingung erfüllt");
    setData(data1)
    if (setCreatedUrlId) { 
      setCreatedUrlId(data1.id);
  }
     }
    console.log(data1);
    
  } catch (error) {
    console.error("Fehler:", error);
  }
}




 const send =  ( e: React.MouseEvent<HTMLButtonElement> , url:string) => {
    e?.preventDefault();
    addToServer("",url);
  };


  const sendWithID =  ( id:string , url :string) => {
        setUrl(url);
      addToServer(id,url);   
    };





 return {url,setUrl,send,sendWithID}

}

export default useAddData