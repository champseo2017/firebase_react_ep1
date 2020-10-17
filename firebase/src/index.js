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

การกำหนดฟังกืชัน security rules
หากเงื่อนไขที่กำหนดใน security rules มีความซับซ้อน เราสามารถสร้างฟังก์ชันเพื่อทำหน้าที่ตรวจสอบกฏ โดยรีเทิร์นผลลัพธ์มาเป็น true หรือ false 
ต่อไปนี้เป็นตัวอย่างฟังก์ชัน isAdmin() สำหรับตรวจสอบว่า ผู้ใช้มีฐานะเป็น admin และกำหนดฟังก์ชัน isLogin() เพื่อตรวจสอบว่าผู้ใช้ได้ล็อกอินเข้าสู่ระบบหรือไม่

service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId}/{document=**} {
      function isAdmin() {
        return get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin'
      }
      function isLogin() {
        return request.auth.uid != null
      }
      allow read, update, delete: if isAdmin() && request.auth.uid == userId;
      allow create: if isLogin();
    }
  }
}



*/
