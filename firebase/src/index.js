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

การกำหนดกฏโดยอ้างอิงข้อมูลจากส่วนอื่นๆ ของฐานข้อมูล

การอ้างอิงเอกสารที่อยู่ในคอลเล็กชันอื่นๆ ของ cloud firestore สามารถทำได้ 2 แบบ ดังนี้
- แบบที่ 1 ใช้ get(path) เพื่อใช้ข้อมูลที่อยู่ในเอกสาร โดยระบุฟิลด์ที่ต้องการข้อมูล
- แบบที่ 2 ใช้ exists(path) ใช้เพื่อตรวจสอบว่าเอกสารต้องการอ้างอิงถึงนั้นมีอยู่หรือไม่

การอ้างอิงข้อมูลจากการใช้ get() หรือ exites() นั้น เราจะต้องผ่านค่าพาธที่ต้องการอ้างอิงเข้าไป ข้อสังเกตคือ การอ้างอิงตัวแปรใน get() หรือ exites() นั้นจะมีรูปแบบต่างจากการอ้างอิงพาธในส่วนของ match โดยจะไม่ใช้ {} ครอบชื่อตัวแปร แต่จะใช้ $() ครอบชื่อตัวแปรแทน เช่น $(userId), $(request.auth.id) เป็นต้น

get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role
exists(/database/$(database)/documents/posts/$(request.resource.id)).data.email
- เข้าไปยังคอลเล็กชัน users โดยเลือกเอกสารที่มีค่า id เท่ากับ request.auth.uid จากนั้นนำข้อมูลที่อยู่ในฟิลด์ role ของเอกสารมาใช้งาน
- เข้าไปยังคอลเล็กชัน posts โดยเลือกเอกสารที่มีค่า id เท่ากับ request.resource.id แล้วตรวจสอบว่า ข้อมูลที่อยู่ในฟิลด์ email มีอยู่หรือไม่ ถ้ามีอยู่จะได้ผลลัพธ์เป็น true แต่ถ้าไม่มีอยู่ก็จะได้ผลลัพธ์เป็น false

ต่อไปนี้เป็นตัวอย่างกฏ ซึ้งจะอณุญาตให้ write เอกสารได้เฉพาะผู้ใช้ที่มีฐานะเป็น admin เท่านั้นส่วนการ read จะอณุญาติให้กับผู้ใช้ที่ล๊อกอินเข้าสู่ระบบ

service cloud.firestore {
  match /databases/{database}/documents {
    match /posts/{postId} {
      allow write: if get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
      allow read: if request.auth.uid != null;
    }
  }
}

- เข้าไปยังคอลเล็กชัน posts ไปยังเอกสารที่มีค่า id เท่ากับ postId 
- ตรวจสอบเอกสาร โดยไปยังคอลเล็กชัน users และเลือกผู้ใช้ที่มีค่า id เท่ากับ request.auth.uid จากนั้นให้ดูข้อมูลที่อยู่ในฟิลด์ role หากมีค่าเท่ากับ admin แสดงว่าอณุญาติให้ write ได้
- อณุญาติให้ read หากผู้ใช้ล๊อกอินเข้าสู่ระบบเรียบร้อยแล้ว



*/
