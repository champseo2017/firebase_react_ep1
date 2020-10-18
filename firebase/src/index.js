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

อับโหลดไฟล์ด้วยเมธอด put
การอัพโหลดเราจะต้องอ้างอิงไปยังตำแหน่งของไฟล์ที่ต้องการก่อน (ตำแหน่งโฟลเดอร์และชื่อไฟล์) จากนั้นจึงใช้เมธอด put() เพื่ออัพโหลด

const fileRef = storage.child("mainBucket/subBucket/myfile.jpg");
fileRef
.put(file)
.then((response) => {
  console.log(response);
})

-ประกาศตัวแปร fileRef เพื่ออ้างอิงไปยังไฟล์ชื่อว่า myfile.jpg ซึ้งหากไฟล์นี้ไม่มีอยู่ cloud storage ก็จะสร้างให้ใหม่โดยอัตโนมัติ

put(file)


*/
