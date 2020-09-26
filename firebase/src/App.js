import React, { useState, useEffect } from "react";
import database from "./database/firebase";
const App = () => {
    
};

/* 
แก้ไขเอกสาร
การแก้ไขเอกสารจะถูกแบ่งออกเป็น 2 แบบดังนี้
แบบที่ 1 แก้ไขค่าเฉพาะบางฟิลด์ด้วยเมธอด update() เป็นการเลือกแก้ไขเฉพาะฟิลด์ที่ต้องการ โดยข้อมูลในฟิลด์อื่นๆ ไม่ได้ถูกแก้ไข ผลลัพธ์จากเมธอด update() จะรีเทิร์นค่ากลับมาเป็นออบเจ็กต์ Promise

ต่อไปนี้คือตัวอย่าง การอัปเดตข้อมูลนักเรียนเฉพาะที่อยู่ในฟิลด์ userName

const docRef = firestore.collection("users")
.doc('xxx');
docRef
.update({userName: "ชื่อใหม่"})
.then(() => {
  console.log("Document update!!!");
})
.catch((error) => {
  console.log("Error getting document: ", error);
})

*/

export default App;
