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
ถ้าต้องการอนุญาติให้ใครๆ ก็สามารถ read ได้ แต่จำกัดการ write ได้เฉพาะผู้ที่เป็นเจ้าของเอกสาร ก็ให้กำหนดกฏเป็นดังนี้

service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read;
      allow write: if request.auth.uid === userId;
    }
  }
}


*/
