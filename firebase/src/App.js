import React, { useState, useEffect } from "react";
import database from "./database/firebase";
const App = () => {
  const docRef = database.collection("users");
  const query = docRef
    .where("userName", "==", "เนย์มาร์")
    .where("age", ">", "20");

  const dataQueryFunc = () => {
    return query
      .get()
      .then((querySnapshot) => {
        let dataObject = null;
        querySnapshot.forEach((doc) => {
          if (doc.exists) {
            dataObject = doc.data();
          }
        });

        console.log(dataObject);
      })
      .catch((err) => {
        console.log("error query", err);
      });
  };

  dataQueryFunc();

  return <div>fewf</div>;
};

/* 
การกำหนดดัชนี (Index)

*/

export default App;
