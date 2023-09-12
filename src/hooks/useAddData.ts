import { useState,useContext } from 'react'
import { RequestBody, ServerResponse } from '../models/dataTypes';
import DataContext from '../context/DataContext';



function useAddData(setAutoCreatedId: React.Dispatch<React.SetStateAction<string>> = () => {}) {
 
 const [url,setUrl]= useState<string>("")
 const [errorMessageAdd,setErrorMessageAdd]= useState<string>("")
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
          setErrorMessageAdd("Bad Request");
          break;

        case 409:
          setErrorMessageAdd("ID already exists");
          break;

        case 500:
          setErrorMessageAdd("Internal Server Error");
          break;

        default:
          setErrorMessageAdd("unknown error");
      };

    }      
    
    const data: ServerResponse = await response.json();
    handleAddNewItem(data);
    
     if(!id ){
    if (setAutoCreatedId) { 
      setAutoCreatedId(data.id);
  }
     }
    
  } catch (error) {
    console.error("Fehler:", error);
    if (error instanceof Error) { 
      setErrorMessageAdd(error.message);
    } else {
      setErrorMessageAdd("unknown error");
    }
    
  }
}




 const send =  ( url:string, e?: React.MouseEvent<HTMLButtonElement>, id?:string ) => {
    e?.preventDefault();

    if(id){
      addToServer(id,url);  
    }else{addToServer("",url);}
    

  };


 

    const handleAddNewItem = (newItem :ServerResponse ) => {
      if (data) {
        const updatedData = [...data, newItem];
        setDataList(updatedData);
      }
    }



 return {url,setUrl,send,errorMessageAdd,setErrorMessageAdd}

}

export default useAddData