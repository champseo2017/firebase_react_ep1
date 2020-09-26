import React, { useState, useEffect } from "react";
import database from "./database/firebase";
const App = () => {
    
};

/* 
ลบเอกสารจากคอลเล็กชั่น
ถ้าต้องการลบเอกสารจากคอลเล็กชั่น จะใช้เมธอด delete() ซึ้งผลลัพธ์จากการเรียกใช้เมธอดคือ Promise ต่อไปนี้เป็นตัวอย่างการลบเอกสารด้วยเมธอด delete()

const docRef = firestore.doc("users/id");
docRef
.delete()
.then(() => {
  consol.log("Document Deleted!!!");
})
.catch((error) => {
  console.log("Error getting document:", error);
})
*/

export default App;
