import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

/* 
โครงสร้างพื้นฐานของ Firebase Security Rules

รูปแบบ
service name
match path {
  allow methods: if condition
}

- name คือชื่อบริการที่ต้องการใช้งานกฏความปลอดภัย เช่น cloud.firestore หมายถึง กำหนดกฏสำหรับการอ่านหรือเขียนเอกสารลงใน cloud firestore แต่ถ้าเป็น firebase.storage จะหมายถึงกฏสำหรับการอัปโหลดไฟล์ หรือดูข้อมูลที่อยู่ใน Firebase Storage

- path คือพาธที่ใช้อ้างอิงไปยังคอลเล็กชัน หรือเอกสารต่างๆ กฏที่กำหนดจะมีผลเฉพาะที่ระบุไว้เท่านั้น

-methods คือ รูปแบบการร้องขอข้อมูล เช่น read สำหรับการอ่านข้อมูลหรือ write สำหรับใช้เพื่อเขียนข้อมูล

-condition คือ เงื่อนไขที่ใช้กำหนดกฏ

การกำหนดกฏเพื่อควบคุมการใช้งาน Cloud Firestore
หากเราต้องการควบคุมการอ่านและเขียนข้อมูลลงใน cloud firestore เราจะต้องเลือกเซอร์วิสเป็นแบบ cloud.firestore จากนั้นให้กำหนดกฏความปลอดภัย (Security Rules) เพื่อจำกัด หรือกำหนดขอบเขตการใช้งานของผู้ใช้ 

service cloud.firestore {
  match /databases/{database}/documents {
    ....
  }
}

service cloud.firestore เป็นการบอกให้ทราบว่ากฏที่จะกำหนดนี้มีผลต่อบริการใด เช่น หากกำหนดบริการเป็นแบบ cloud.firestore หมายถึงการกำหนดกฏเพื่อควบคุมการอ่าน, เขียน, แก้ไข หรือลบข้อมูลสำหรับบริการ cloud firestore

match คำสั่ง match ใช้เพื่อตรวจสอบว่า พาธที่มากับ requset นั้นตรงกับพาธที่กำหนดไว้หรือไม่ ซึ้งพาธ /databases/{database}documents หมายถึง คอลเล็กชันหลักที่อยู่ภายใต้ฐานข้อมูล (ภายในฐานข้อมูลสามารถมีหลายคอลเล็กชัน)

Request Method กับกฏความปลอดภัย
เมื่อผู้ใช้ต้องการติดต่อไปยัง cloud firestore ก็จะส่งการร้องขอ (request) ไปยังฐานข้อมูล โดย request ที่ส่งมานั้น จะระบุประเภทการจัดการฐานข้อมูลที่ส่งมาด้วยเรียกว่า request method 
request method มีอยู่ด้วยกันหลายแบบเช่น get, create, update, delete, read, write ซึ้ง requst method ที่ควรให้ความสนใจ

- แบบที่ 1 คือ read ซึ้งหมายถึง การร้องขอเพื่ออ่านข้อมูลจากฐานข้อมูล
- แบบที่ 2 คือ write ใช้สำหรับร้องขอเพื่อเขียนข้อมูลลงไปในฐานข้อมูล
กฏการ read ใช้สำหรับควบคุมการอ่านข้อมูลจากคอลเล็กชัน เมื่ออณุญาตให้ read เอกสาร ก็จะหมายถึงอณุญาติให้ทำสิ่งต่อไปนี้ได้

- get เลือกเอกสารที่ต้องการมาจากคอลเล็กชัน (เลือกเอกสารที่สนใจเพียงรายการเดียว)
- list เลือกชุดเอกสารที่ต้องการมาจากคอลเล็กชัน (เลือกหลายๆ เอกสาร)
กฏการ write ใช้สำหรับควบคุมการเขียนเอกสารไปยังคอลเล็กชัน เมื่ออณุญาติให้ write เอกสาร แสดงว่าอณุญาติให้ทำสิ่งต่อไปนี้ได้
-create เขียนเอกสารใหม่ไปยังคอลเล็กชัน
-update อัปเดตข้อมูลไปยังเอกสารเดิมที่อยู่ในคอลเล็กชัน
-delete ลบเอกสารออกจากคอลเล็กชัน

อนุญาติให้ write เฉพาะผู้ที่ล็อกอินเท่านั้น


service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read: if true;
      allow write: if request.auth.uid != null;
    }
  }
}

กำหนดกฏเฉพาะคอลเล็กชันที่ต้องการ
เช่น ถ้าต้องการกำหนดกฏสำหรับการอ่านและเขียนข้อมูลในคอลเล็กชัน users ก็ให้กำหนดกฏเป็นดังนี้
service cloud.firestore {
  match /database/{database}/documents {
    match /users/{userId}{
      // rule
    }
  }
}

- กำหนดพาธไปยังคอลเล็กชัน users โดย {userId} คือตัวแปร ที่เก็บค่า id ของเอกสารที่อยู่ในคอลเล็กชัน users
- กำหนดกฏที่ต้องการ โดยจะมีผลเฉพาะเอกสารที่อยู่ในคอลเล็กชัน users

ตัวอย่างเช่น กำหนดกฏเพื่ออณุญาติให้ผู้ใช้สามารถอ่านและเขียนเอกสารที่อยู่ในคอลเล็กชัน users โดยอณุญาติเฉพาะเอกสารที่เป็นของตนเองเท่านั้น ให้กำหนดกฏเป็นดังนี้

service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth.uid === userId;
    }
  }
}


*/
