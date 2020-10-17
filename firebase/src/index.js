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

ตรวจสอบข้อมูลที่ส่งมาก่อนแก้ไขฐานข้อมูล
เมื่อผู้ใช้ต้องการสร้างเอกสาร หรือแก้ไขข้อมูลในเอกสารจะมีการส่งข้อมูลที่จะสร้างหรือแก้ไขมายังฐานข้อมูล เราสามารถกำหนดกฏ เพื่อตรวจสอบข้อมูลที่ส่งมาก่อนจะนำไปสร้างหรือแก้ไขเอกสารได้

การอ้างอิงข้อมูลที่ถูกส่งมาจะใช้คำสั่ง request.resource.data ตามด้วยชื่อฟิลด์ที่ต้องการตรวจสอบ เช่น ถ้าต้องการตรวจสอบรหัสผ่านที่อยู่ในฟิลด์ password ก็สามารถดูค่ารหัสผ่านที่ส่งมาด้วยคำสั่ง request.resource.data.password เป็นต้น 

ต่อไปนี้เป็นตัวอย่างการเพิ่มหรือแก้ไขเอกสาร ไปยังคอลเล็กชัน posts โดยจะตรวจสอบว่า ฟิลด์ title ที่ส่งมาพร้อมกับ request จะต้องไม่เป็นข้อความเปล่า จึงอณุญาติให้ write เอกสารได้

service cloud.firestore {
  match /databases/{database}/documents{
    match /posts/{postId}{
      allow read : if true;
      allow write: if request.resource.data.title != '';
    }
  }
}

- กำหนดพาธไปเอกสารที่อยู่ในคอลเล็กชัน posts
- กำหนดกฏ โดยอนุญาติให้ read
- กำหนดกฏ โดยอนุญาติให้ write เมื่อฟิลด์ title ไม่เป็นข้อความว่าง

จากตัวอย่างข้างบน เราใช้วิธีตรวจสอบว่าข้อความที่ส่งมาเป็นข้อความว่างๆ หรือไม่ นอกจากวิธีดังกล่าว เรายังสามารถตรวจสอบว่าค่า title ว่างๆ ด้วยการใช้คำสั่ง !request.resource.data.title

service cloud.firestore {
  match /databases/{database}/documents {
    match /posts/{postId} {
      allow read: if true;
      allow write: if !request.resource.data.title;
    }
  }
}

- กำหนดกฏ โดยอนุญาติให้ write เมื่อฟิลด์ title มีค่า ถ้าไม่มีค่าส่งมาก็จะไม่อณุญาติให้ write ได้



*/
