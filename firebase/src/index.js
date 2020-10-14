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

กำหนดกฏเพื่ออณุญาติให้เจ้าของไฟล์เท่านั้นที่แก้ไขเอกสารได้

service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
       allow read, update, delete: if request.auth.uid == userId;
       allow create: if request.auth.uid != null;
    }
  }
}

อนุญาติให้ read, update หรือ delete เฉพาะผู้ใช้ที่เป็นเจ้าของเอกสาร 
อนุญาติให้ create ได้เฉพาะผู้ใช้ที่ล็อกอินเท่านั้น



*/
