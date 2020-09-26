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
เรียงลำดับผลลัพธ์จากการคิวรี
โดยปกติเมื่อคิวรีเอกสารมาจากคอลเล็กชัน ผลลัพธ์ของเอกสารที่ได้จากคิวรีจะเรียงจากน้อบไปหามาก (Ascending) โดยใช้ค่าที่อยู่ในรหัสเอกสาร (id) แต่เราสามารถคิวรีข้อมูลโดยใช้ค่าจากฟิลด์อื่นๆ แทนได้ ด้วยเมธอด orderBy()

รูปแบบ
query.orederBy(fileName, order)

cosnt docRef = firestore.collection("users")
const query = docRef.orederBy("userName", "desc");
query
.get()
.then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      if(doc.exists){
          console.log(doc.data());
      }
    })
})
.catch((err) => {
  console.error(err);
})


*/

export default App;
