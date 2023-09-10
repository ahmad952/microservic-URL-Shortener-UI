import { useState } from 'react'
import { ServerResponse } from '../context/DataContext'

const useDataManagement = () => {

    const [DataManagement, setData] = useState<ServerResponse[]>([]);



    const handleSort = (data: ServerResponse[]) => {
       const sortedData = data.sort((a, b) => {
         return a.id > b.id ? 1 : -1;
        });

        setData(sortedData);
        
         };

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
            const newData = DataManagement.filter((item) => item.id !== id);
            handleSort(newData);
          } else {
            console.error(`Failed to delete item with ID ${id}.`);
          }
        } catch (error) {
          console.error("There was an error deleting the item:", error);
        }
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
            handleSort(fetchedData);
        } catch (error) {
            console.error("Es gab ein Problem mit der Netzwerkanfrage:", error);
        }
    };





      return { DataManagement, handleDelete, getData };
}








export default useDataManagement