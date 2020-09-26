import React, { useState, useEffect } from "react";
import database from "./database/firebase";
const App = () => {
    
};

/* 
คิวรี่ข้อมูลที่ซับซ้อนขึ้น
ในการคิวรี่ด้วยการใช้เมธอด where() หากเงื่อนไขในการคิวรี่มีหลายเงื่อนไขเราสามารถเรียกใช้เมธอด where() ได้หลายครั้ง เพื่อกำหนดเงื่อนไขในแบบที่ต้องการ

const docRef = firestore.collection("users")
const query = docRef
.where("userName", "==", "โรนัลโด้")
.where("age", ">", 29);
*/

export default App;
