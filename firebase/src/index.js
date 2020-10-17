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

จำกัดจำนวนเอกสารในแต่ละคิวรี
การใช้ request method ในแบบ list เพื่อคิวรีเอกสารจากคอลเล็กชันไปใช้งาน
request.query.limit 

service cloud.firestore{
  match /databases/{database}/documents {
    function isLogin() {
      return request.auth.uid != null
    }
    match /posts/{postId}{
      allow list: if request.query.limit <= 15 && isLogin();
      allow get, write: if isLogin()
    }
  }
}



*/
