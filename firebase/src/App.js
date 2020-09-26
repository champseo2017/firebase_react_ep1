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
จำกัดผลลัพธ์จากการคิวรี
โดยเรียกเมธอด limit() โดยผ่านค่าจำนวนเอกสารสูงสุดลงไป และกำหนดวิธีเรียงข้อมูลว่าจะเรียงจากน้อยไปหามาก หรือมากไปหาน้อย
รูปแบบ
query.limit(number)
- query คือ Query ออบเจ็กต์ซึ้งอ้างอิงไปยังเอกสารที่ตรงกับเงื่อนไขที่กำหนด
- limit() คือ เมธอด ที่ใช้จำกัดจำนวนผลลัพธ์ที่ได้มาจากการคิวรี
- number คือจำนวนเอกสารสูงสุดที่ได้มาจากการคิวรี่ในแต่ละครั้ง

ต่อไปนี้เป็นตัวอย่างการเรียงลำดับผลลัพธ์จากการคิวรี ด้วยค่าจากฟิลด์ age โดยเรียงจากน้อยไปหามาก และจำกัดจำนวนผลลัพธ์แค่ 10 รายการ

const docRef = firestore.collection("users");
const query = docRef.orderBy("age", "asc");
query.limit(10);
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
  console.log(err);
})


*/

export default App;
