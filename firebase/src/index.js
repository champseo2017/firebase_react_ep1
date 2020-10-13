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

กำหนดกฏหลายเงื่อนไข
เช่น กำหนดกฏสำหรับคอลเล็กชัน users และ กำหนดกฏสำหรับคอลเล็กชัน posts 

service cloud.firestore {
  match /datanases/{database}/documents {
    match /users/{userId} {
      allow read;
      allow write: if request.auth.uid == userId;
    }
    match /posts/{postId} {
      allow read;
      allow write: if request.auth.uid != null
    }
  }
}



*/
