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


การกำหนดกฏสำหรับคอลเล็กชันย่อย
เราสามารถกำหนดกฏไปยังคอลเล็กชันย่อย เช่น คอลเล็กชัน users เก็บข้อมูลของผู้ใช้ และมีคอลเล็กชัน chats เป็นคอลเล็กชันย่อยที่อยู่ภายใต้ users 

service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      match /chats/{chatId} {
        allow read, write: if request.auth.uid != null;
      }
    }
  }
}

*/
