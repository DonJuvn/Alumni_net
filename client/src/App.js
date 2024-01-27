// App.js
import React, { useState, useEffect } from "react";

import { Navigation } from "./components/navigation";

function App() {
   const [data, setData] = useState({ users: [] });

   useEffect(() => {
      fetch("/users")
         .then((response) => response.json())
         .then((data) => {
            setData(data);
         });
   }, []);

   return (
      <div>
         <Navigation />
         {Array.isArray(data.users) && data.users.length === 0 ? (
            <p>Loading...</p>
         ) : (
            <ul>
               {data.users.map((user, i) => (
                  <li key={i}>
                     <strong>Email:</strong> {user.email},{" "}
                     <strong>First Name:</strong> {user.firstname}
                  </li>
               ))}
            </ul>
         )}
      </div>
   );
}

export default App;
