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

กำหนดกฏด้วยการอ้างอิงค่าในฟิลด์ต่างๆ ของเอกสาร

วิธีอ้างอิงค่าซึ้งเก็บไว้ในฟิลด์ต่างๆ ของเอกสารในคอลเล็กชันปัจจุบัน จะใช้คำสั่ง resource.data ตามด้วยชื่อฟิลด์ที่ต้องการตรวจสอบค่า เช่น resource.data.displayName หมายถึง การอ้างอิงค่าที่อยู่ในฟิลด์ displayName

ต่อไปนี้เป็นตัวอย่างการกำหนดกฏ ตรวจสอบว่าโพสต์การอ่านและแก้ไขเอกสารในคอลเล็กชัน posts โดยจะตรวจสอบก่อนว่า หากฟิลด์ visibility เก็บค่า public เอาไว้ก็จะอณุญาตให้อ่าน หรือแก้ไขเยื้อหาในโพสต์นั้นๆ ได้

service cloud.firestore{
  match /databases/{database}/documents {
    match /posts/{postId} {
      allow read, write: if resource.data.visibility == 'public';
    }
  }
}

- กำหนดพาธไปเอกสารที่อยู่คอลเล็กชัน posts
- กำหนดกฏ โดยอนุญาติให้ read และ write เมื่อข้อมูลที่อยู่ในฟิลด์ visibility มีค่าเป็น public



*/
