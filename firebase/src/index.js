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

การพิจารณาเมื่อมีกฏหลายชุด
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId}/{document=**} {
      allow read, update, delete: if request.auth.uid == userId;
      allow create: if request.auth.uid != null;
    }
    match /users/{userId}{
      allow read, write: if true;
    }
  }
}

- กำหนดพาธไปยังคอลเล็กชัน users โดย {userId} คือตัวแปรที่เก็บค่า id ของเอกสารที่อยู่ในคอลเล็กชัน users โดยจะรวมถึงเอกสารต่างๆ ที่ อยู่ในคอลเล็กชันย่อยที่อยู่ภายใต้คอลเล็กชัน user ด้วย

- อนุญาติให้ read, update หรือ delete หากผู้แก้ไขเป็นเจ้าของไฟล์
- อณุญาติให้ create เฉพาะผู้ใช้ล๊อกอิน
- กำหนดพาธไปยังคอลเล็กชัน users
- อณุญาติให้ read หรือ write เอกสารได้

แม้ว่าจะไม่ผ่านกฏบางข้อ แต่หากผ่านกฏเพียงกฏใดกฏหนึ่งก็สามารถจัดการกับเอกสารได้



*/
