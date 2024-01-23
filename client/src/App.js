// App.js
import React, { useState, useEffect } from "react";

function App() {
   const [data, setData] = useState([{}]);

   useEffect(() => {
      fetch("/api")  // This will use the proxy defined in package.json
         .then((response) => response.json())
         .then((data) => {
            setData(data);
         });
   }, []);

   return (
      <div>
         {typeof (data.users) === "undefined" ? (
            <p>Loading...</p>
         ) : (
            data.users.map((user, i) => (<p key={i}>{user}</p>))
         )}
      </div>
   );
}

export default App;
