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
ใช้ DocumentSnapshot เป็นตำแหน่ง Query Cursor
ค่าพารามิเตอร์ที่ผ่านเข้าไปยังเมธอด startAt(), startAfter(), endAt() หรือ endBefore() สามารถกำหนดได้ 2 แบบดังนี้

- แบบที่ 1 ผ่านค่าข้อมูลในฟิลด์เดียวกับที่พิจารณาอยู่ เช่น เมื่อพิจารณษฟิลด์ userName ซึ้งเก็บรายชื่อนักเรียนเอาไว้ ดังนั้นค่าที่ผ่านเข้าไปยังเมธอด ก็จะเป็นชื่อนักเรียนด้วย เช่น startAt("สมชาย") และ endBefore("มานี") เป็นต้น

const docRef = firestore.collection("students");
const query = docRef
.orderBy("userName")
.startAt("สมชาย")
.endBefore("มานี");

แบบที่ 2 ผ่านค่า documentSnapshot เริ่มจากใช้เมธอด get() เพื่อเลืกเอกสารที่ต้องการจากฐานข้อมูล ผลลัพธ์ที่ได้จากเมธอด get() จะเป็น dicumentSnapshot เราสามารถใช้ค่านี้ผ่านเข้าไปยังเมธอด startAt() เพื่อกำหนด query cursor บอกตำแหน่งเริ่มต้นของการคิวรีได้

ต่อไปนี้เป็นตัวอย่างการเลือกสินค้าที่มีรหัส pid0001 มาจากคอลเล็กชัน ยroducts จากนั้นจึงค้นหาสินค้าอื่นๆ ที่มีราคาสินค้ามากกว่าสินค้าตัวนี้

const productsRef = firestore.collection("products");
productsRef
.doc("pid0001")
.get()
.then((documentSnapshot) => {
  const query = productsRef.orderBy("price").startAfter(documentSnapshot);
})

*/

export default App;
