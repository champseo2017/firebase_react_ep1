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
แบ่งผลลัพธ์ออกเป็นหน้าย่อยๆ (Pagination)
เช่นถ้าเอกสารที่ดึงจากฐานข้อมูลมีจำนวน 72 รายการถ้าต้องการแสดงหน้าละ 8 รายการ จำนวนหน้าทั้งหมดที่ต้องใช้คือ 9 หน้า
หลักการพื้นฐานของการแสดงแต่ละหน้าคือ คิวรีเอกสารเฉพาะที่ต้องแสดงในหน้านั้นๆ เท่านั้น ไม่ต้องคิวรีทั้งหมดในคราวเดียว ซึ้งวิธีแบ่งหน้าใน firestore จะใช้การจำกัดจำนวนเอกสารคิวรี และใช้ Query Cursor เพื่อกำหนดตำแหน่งของเอกสารที่จะนำมาแสดง

หลักการพื้นฐานของการแบ่งเอกสารเป็นหน้าๆ จะเป็นดังนี้
1.แสดงหน้าแรกขึ้นมาก่อน โดยจำกัดจำนวนเอกสารด้วยเมธอด limit()

const firstPageRef = firestore
.collection("products")
.orderBy("pid", "desc")
.limit(8);

เอกสารสุดท้ายที่แสดงในหน้าแรก จะทำหน้าที่เป็น Query Cursor เพื่อบอกจุดเริ่มต้นของเอกสารของหน้าถัดไป ดังนั้นเราจะต้องเก็บ DocumentSnapshot นี้ไว้เป็นเอกสารอ้างอิง

2.เอกสารสุดท้ายที่แสดงในหน้าแรก จำทำหน้าที่เป็น Query Cursor เพื่อบอกจุดเริ่มต้นเอกสารของหน้าถัดไป ดังนั้นเราจะต้องเก็บ DocumentSnapshot นี้ไว้เป็นเอกสารอ้างอิง

firstPageRef.get().then((querySnapshot) => {
  const currentLength = querySnapshot.docs.length;
  const lastDocFromFirstPage = querySnapshot.docs[currentLength - 1]
})
3.แสดงเอกสารหน้าที่สอง โดยเริ่มแสดงเอกสารต่อจากเอกสารสุดท้ายของหน้าแรก และจำกัดจำนวนเอกสารด้วยเมธอด limit()

firstPageRef.get().then((querySnapshot) => {
  const currentLength = querySnapshot.docs.length;
  const lastDocFromFirstPage = querySnapshot.docs[currentLength - 1];
  const query = firstPageRef.startAfter(lastDocFromFirstPage);
  query.get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      console.log(doc.data().price)
    })
  })
})

*/

export default App;
