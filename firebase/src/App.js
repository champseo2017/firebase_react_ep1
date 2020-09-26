import React, { useState, useEffect } from "react";
import database from "./database/firebase";
const App = () => {
    
};

/* 
คิวรีข้อมูลแบบง่ายๆ 
การคิวรีข้อมูลใน firestore จะใช้เมธอด where() โดยผ่านพารามิเตอร์ เพื่อกำหนดเงื่อนไขของการคิวรี่ ซึ้งรุปแบบพื้นฐานของเมธอด where จะเป็นดังนี้
รูปแบบ
where(fieldName, queryOperator, value)
-where คือเมธอดที่ใช้กำหนดคิวรี่ เพื่อเลือกเฉพาะเอกสารที่ตรงกับเงื่อนไขมาจากคอลเล็กชัน ผลลัพธ์ที่ได้จากเมธอด where() จะเป็น query ออบเจ็กต์ ที่ใช้อ้างอิงไปยังเอกสารต่างๆ ที่ตรงกับเงื่อนไข
-fieldName คือชื่อฟิลด์ที่ใช้เป็นเงื่อนไขในการคิวรี่ข้อมูลจากฐานข้อมูล
-queryOperator คือ โอเปอร์เรตอร์ที่ใช้บอกขอบเขตของเงื่อนไข ซึ้งโอเปอร์เรเตอร์ที่สามารถใช้กับเมธอด where() ได้แก่ <, <=, ==, >, >=, array-contains, in และ array-contains-any
-value คือ ค่าที่ใช้ตรวจสอบ

ต่อไปนี้เป็นตัวอย่างการกำหนดคิวรี เพื่อเลือกเอกสารมาจาคอลเล็กชั่น users

const docRef = firestore.collection("users");
const query1 = docRef.where("userName", "==", "โรนัลโด้")
const query2 = docRef.where("age", ">=", 25)

ผลลัพธ์ที่ได้จากเมธอด where() คือ query ออบเจ็กต์ที่ได้อ้างอิงไปยังเอกสารต่างๆ ที่ตรงกับเงื่อนไข ไม่ใช้ข้อมูลเอกสาร ดังนั้นหากต้องการนำเอกสารมาใช้งาน จะต้องเรียกเมธอด get() อีกครั้งหนึ่ง

const docRef = firestore.collection("users")
const query = docRef.where("userName", "==", "โรนัลโด้")
query
.get()
.then((querySnapshot)=>{
  querySnapshot.forEach((doc)=>{
    if(doc.exists){
        console.log(doc);
    }
  })
})
.catch((err) => {
  console.log(err);
})
*/

export default App;
