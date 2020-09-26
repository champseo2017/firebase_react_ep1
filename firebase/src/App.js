import React, { useState, useEffect } from "react";
import database from "./database/firebase";
const App = () => {
    
};

/* 
แบบที่ 2 แก้ไขเอกสารด้วยเมธอด set() เป็นการแก้ไขเอกสารด้วยการสร้างเอกสารใหม่ ไปแทนที่เอกสารเดิมที่อยู่ในคอลเล็กชั่น โดยผลลัพธ์จากเมธอด set() จะรีเทิร์นค่ากลับมาเป็นออบเจ็กต์ Promise
ต่อไปนี้คือตัวอย่าง การอัปเดตข้อมูลนักเรียนโดยใช้เมธอด set()

const docRef = firestore.doc("user/id");
docRef
.set({userName: "โรนัลโด้", team: "จูเวนตุส"})
then(()=>{
  console.log("Document update!!!");
})
.catch((error)=>{
  console.log("Error getting document:", error);
})
*/

export default App;
