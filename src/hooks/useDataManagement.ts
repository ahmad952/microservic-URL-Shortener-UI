import {useContext ,useState} from 'react'
import { RequestBody, ServerResponse } from '../models/dataTypes';
import DataContext from '../context/DataContext';

const useDataManagement = () => {
  const [errorMessageM,setErrorMessageM]= useState<string>("")

    const dataContext = useContext(DataContext);
    if (!dataContext) {
      throw new Error("DataContext is not available!");
    }
    const { data,setDataList } = dataContext;

 //Aut
 const username = process.env.REACT_APP_USERNAME;
 const password = process.env.REACT_APP_PASSWORD;
 const base64 = btoa(username + ":" + password);



    const handleDelete = async (id: string) => {
        try {
          const response = await fetch(`https://urlshortener.smef.io/urls/${id}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Basic " + base64,
            },
          });
          if (response.ok) {
            const newData = data?.filter((item) => item.id !== id);
            if(newData){
            setDataList(newData);
            }
          } else {
            switch(response.status) {
              case 400:
                throw new Error("Bad Request");
              case 404:
                throw new Error("NotFound");
              case 500:
                throw new Error("Internal Server Error");
              default:
                throw new Error("unknown error");
            };
          }
        } catch (error) {
          console.error("There was an error deleting the item:", error);
          if (error instanceof Error) { 
            setErrorMessageM(error.message);
         
          } else {
            setErrorMessageM("unknown error");
          }

        }
      };


      const sort = (array: ServerResponse[]) => {
        array.sort((a, b) => {
          const idA = a.id;
          const idB = b.id;
      
          if (!isNaN(Number(idA)) && !isNaN(Number(idB))) {
            return Number(idA) - Number(idB);
          }
      
          if (!isNaN(Number(idA))) return -1;
      
          if (!isNaN(Number(idB))) return 1;
      
          
          if (idA < idB) return -1;
          if (idA > idB) return 1;
          return 0;
        });
        return array;
      };




      const getData = async () => {
        try {
            const response = await fetch("https://urlshortener.smef.io/urls", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Basic " + base64,
                },
            });
            const fetchedData = await response.json();
                if(response.ok){
               const sortedData = sort(fetchedData);
               setDataList(sortedData);
                  }
                 else{
                  switch(response.status) {
                    case 400:
                      throw new Error("Bad Request");
                    case 500:
                      throw new Error("Internal Server Error");
                    default:
                      throw new Error("unknown error");
                  };
                 }



        } catch (error) {
            console.error("There was an error get the items::", error);
            if (error instanceof Error) { 
              setErrorMessageM(error.message);
            } else {
              setErrorMessageM("unknown error");
            }
        }
    };
       
    const handleEdit = async (ttlInSeconds: number | null, url:string,id:string) => {

      const body: RequestBody = {
        url,
        ttlInSeconds,
      };
      console.log(body);

      try {
        const response = await fetch(`https://urlshortener.smef.io/urls/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Basic " + base64,
          },
          body: JSON.stringify(body),
        });
        if (response.ok) {
          getData()
        } else {


          switch(response.status) {
              case 400:
                throw new Error("Bad Request");
              case 404:
                throw new Error("NotFound");
              case 500:
                throw new Error("Internal Server Error");
              default:
                throw new Error("unknown error");
            };
        }
      } catch (error) {
        console.error("There was an error Editing the item:", error);
        if (error instanceof Error) { 
    
          setErrorMessageM(error.message);
          
        } else {
          setErrorMessageM("unknown error");
         
        }
      }
    };


     return { handleDelete, getData,handleEdit,errorMessageM  };
}




export default useDataManagement