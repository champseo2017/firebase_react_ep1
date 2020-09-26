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
รู้จักกับ Query Cursor
เมื่อใช้คิวรี เพื่อเลือกเอกสารมาจากฐานข้อมูล เราจะได้ข้อมูลเอกสารจำนวนหนึ่งเราสามารถใช้ query cursor เพื่อกำหนดจุดเริ่มต้น และจุดสิ้นสุดของเอกสารที่ต้องการ เช่น เลือกเฉพาะรายการสินค้าที่เพิ่งเข้ามาใหม่วันนี้ หรือเลือกนักเรียนที่มีรหัสนักเรียนระหว่าง 3-5 เป็นต้น

Collection users -> querySnapshot -> Query Cursor -> query

วิธีกำหนด Query Cursor เพื่อกำหนดจุดเริ่มต้นของการคิวรี จะใช้เมธอด startAt() หรือ startAfter() ส่วนการกำหนดจุดสิ้นสุดจะใช้เมธอด endAt() หรือ endBefore()

- เมธอด startAt() กำหนดจุดเริ่มต้นที่ต้องการคิวรี โดยรวมเอกสารที่เป็นจุดเริ่มต้นด้วย
- เมธอด startAfter() กำหนดจุดเริ่มต้นที่ต้องการคิวรี โดยไม่รวมเอกสารที่เป็นจุดเริ่มต้น

- เมธอด endAt() กำหนดจุดสิ้นสุดที่ต้องการคิวรี โดยรวมเอกสารที่เป็นจุดสิ้นสุดด้วย
- เมธอด endBefore() กำหนดจุดสิ้นสุดของเอกสาร โดยไม่รวมเอกสารที่เป็นจุดสิ้นสุด

ต่อไปนี้เป็นตัวอย่าง การคิวรีรายชื่อนักเรียน โดยเรียงลำดับจากรหัสนักเรียนแล้วใช้ startAt() เพื่อกำหนดจุดเริ่มต้นของการคิวรี่

const docRef = firestore.collection("students");
const query = docRef
.orderBy("studentId")
.startAt("34102065");


การกำหนด query cursor สามารถกำหนดจุดเริ่มต้นและจุดสิ้นสุดในคิวรีเดียวกันได้ ดังตัวอย่างต่อไปนี้

const docRef = firestore.collection("students");
const query = docRef
.orderBy("studenId")
.startAt("34102065")
.endBefore("36425059")

ใช้เมธอด endBefore() เพื่อกำหนดจุดสิ้นสุดของ Query Cursort โดยผลลัพธ์ของเอกสารจะไม่รวมเอกสารที่มีรหัสนักเรียนเป็น 36425059


*/

export default App;
