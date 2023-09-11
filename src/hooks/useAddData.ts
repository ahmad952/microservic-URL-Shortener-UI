import { useState,useContext } from 'react'
import { RequestBody, ServerResponse } from '../models/dataTypes';
import DataContext from '../context/DataContext';



function useAddData(setCreatedUrlId: React.Dispatch<React.SetStateAction<string>> = () => {}) {
 
 const [url,setUrl]= useState<string>("")
 const [errorMessageAdd,setErrorMessage]= useState<string>("")
 const dataContext = useContext(DataContext);
 if (!dataContext) {
  throw new Error("DataContext is not available!");
}
 
const { data,setDataList } = dataContext;


  
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
      switch(response.status) {
        case 400:
          throw new Error("Bad Request");
        case 409:
          throw new Error("ID already exists");
        case 500:
          throw new Error("Internal Server Error");
        default:
          throw new Error("unknown error");
      }
    }  
    console.log(response.body);
    
    
    const data: ServerResponse = await response.json();
    handleAddNewItem(data);
    
     if(id == ""){
    if (setCreatedUrlId) { 
      setCreatedUrlId(data.id);
  }
     }

    console.log(data);
    
  } catch (error) {
    console.error("Fehler:", error);
    if (error instanceof Error) { 
      setErrorMessage(error.message);
    } else {
      setErrorMessage("unknown error");
    }
    
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

    const handleAddNewItem = (newItem :ServerResponse ) => {
      if (data) {
        const updatedData = [...data, newItem];
        setDataList(updatedData);
      }
    }



 return {url,setUrl,send,sendWithID,errorMessageAdd}

}

export default useAddData