import { useState } from 'react'
import { ServerResponse } from '../context/DataContext'

const useDataManagement = (base64 :string) => {

    const [ModifyData, setData] = useState<ServerResponse[]>([]);



    const handleSort = (data: ServerResponse[]) => {
       const sortedData = data.sort((a, b) => {
         return a.id > b.id ? 1 : -1;
        });

        setData(sortedData);
        
         };



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
            const newData = ModifyData.filter((item) => item.id !== id);
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





      return { ModifyData, handleDelete, getData };
}








export default useDataManagement