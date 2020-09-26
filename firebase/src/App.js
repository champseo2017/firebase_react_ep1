import React, { useState, useEffect } from "react";
import firestore from "./database/firebase";
function App() {
  const [userName, setUserName] = useState("");
  const [age, setAge] = useState("");
  const addUserHandler = (obj) => {
    const ref = firestore.collection("users");
    ref
      .add(obj)
      .then(() => {
        console.log("add successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const obj = {
      userName: userName,
      age: age,
    };
    setUserName("");
    setAge("");
    addUserHandler(obj);
  };

  return (
    <div
      style={{
        width: "80%",
        marginLeft: 20,
      }}
    >
      <form onSubmit={submitHandler}>
        <label>ชื่อ</label>
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <label>อายุ</label>
        <input
          type="text"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

/* 
การใช้เมธอด doc() ร่วมกับเมธอด set() ใช้สำหรับแก้ไขเอกสารที่อยู่ในคอลเลชันจากรหัสเอกสาร แต่ถ้าไม่พรหัสเอกสารในคอลเลคชัน ก็จะสร้างเอกสารใหม่ขึ้นมาโดยอัตโนมัติ แต่ถ้าพบรหัสเอกสาร ก็จะนำข้อมูลเอกสารใหม่ไปแทนที่เอกสารเดิม

รู้จักกับ CRUD Operations
create, read, update, delete
คำสั่งที่ใช้สำหรับการเพิ่มข้อมูลไปยัง firebase เราจะสั่งงานผ่านทางโมดูล firebase ซึ้งมีให้เลือกใช้หลายวิธี เช่น

- เมธอด add() สำหรับเพิ่มเอกสารใหม่ไปยังคอลเล็กชันที่กำหนด
- เมธอด set() นำเอกสารใหม่ไปเขียนทับเอกสารเดิมที่อยู่ในคอลเล็กชั่น กรณีที่คำสั่ง set ไม่พบเอกสารในคอลเล็กชั่นก็จะสร้างเอกสารขึ้นมาใหม่โดยอัตโนมัติ

คำสั่งที่ใช้เพื่อดึงเอกสารที่ต้องการออกมาจากฐานข้อมูล เราก็สามารถสั่งงานผ่านทางโมดูล firebase ดังนี้

- เมธอด get() ใช้เลือกเอกสาร (Document) ทั้งหมดที่ตรงกับเงื่อนไขออกมาจากฐานข้อมูล หรือเลือกเฉพาะเอกสารที่มีรหัสเอกสารตรงกับที่กำหนด
- เมธอด onSnapshot() ใช้เพื่อนำเอกสารจากฐานข้อมูลมาใช้งานในแบบเรียลไทม์ เมธอด onSnapshot() จะดึงข้อมูลล่าสุดออกมา และติดตามการเปลี่ยนแปลงข้อมูลภายในเอกสาร หากข้อมูลในเอกสารเปลี่ยนแปลง ก็จะส่งข้อมูลใหม่มาให้อัตโนมัติ

คำสั่งสำหรับใช้แก้ไขเอกสาร (Document) เราสามารถเลือกแก้ไขข้อมูลเฉพาะฟิลด์ที่กำหนด หรือสร้างเอกสารใหม่ให้ไปเขียนทับเอกสารเดิมก็ได้

- เมธอด update() ใช้เพื่ออัปเดตเฉพาะข้อมูลบาส่วนในเอกสาร โดยจะแก้ไขเฉพาะฟิลด์ที่ต้องการเท่านั้น ฟิลด์อื่นๆ ก็จะมีข้อมูลอยู่เหมือนเดิม

- เมธอด set() ใช้เพื่อนำเอกสารใหม่ไปแทนที่เอกสารเก่าที่อยู่ในฐานข้อมูล (ข้อมูเดิมในเอกสารจะถูกลบ)

คำสั่งสำหรับบเอกสารออกจากฐานข้อมูล จะใช้เมธอด delete() เริ่มจากกำหนดพาธ หรือรหัสเอกสารเพื่อเลือกเอกสารที่ต้องการจากคอลเล็กชัน จากนั้นจึงใช้เมธอด delete() เพื่อลบเอกสารออกจากฐานข้อมูล



*/
export default App;
