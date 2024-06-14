import React, { useEffect, useState } from "react";
import axios from "axios";
import Contect from "./Contect"; 
import Addcontect from "./Addcontect";

function App() {
  const [contacts, setContacts] = useState([]); 
  const [reload, setReload] = useState(false); 

  const URL = "http://localhost:4001/users";

  function handleReload(){
    setReload(prev=> !prev)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        let api = await axios.get(URL, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log(api.data);
        setContacts(api.data);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, [reload]);

  return (
    <>
      <Addcontect handleReload={handleReload}/>
      <Contect contacts={contacts}></Contect> 
    </>
  );
}

export default App;
