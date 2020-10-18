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

อ้างอิงไปยังโฟลเดอร์หรือไฟล์ที่ต้องการด้วยเมธอด child
การอ้างอิงไฟล์หรือโฟลเดอร์ต่างๆ ใน cloud storage คล้ายกับการอ้างอิงคอลเล็กชัน และเอกสารใน firestore คือ สามารถใช้พาธเพื่อไปยังโฟลเดอร์ ตามด้วยเครื่องหมาย / แล้วตามด้วยชื่อไฟล์ เช่น mainBucket/myfile.png

import React from 'react'
import {storage} from './database/firebase'
export default function TestStorage() {
  const mainBucketRef = storage.child("mainBucket");
  const subBucketRef = storage.child("mainBucket/subBucket")
  const videoRef = storage.child("mainBucket/subBucket/56350.mp4")
  return <div></div>
}



*/
