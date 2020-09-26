import React, { useState, useEffect } from "react";
import database from "./database/firebase";
const App = () => {
  const [userName, setUserName] = useState("");
  const [age, setAge] = useState("");
  const addUserHandler = (obj) => {
    const ref = database.collection("users");
    const id = "myId#" + Math.random(999).toString();
    ref
      .doc(id)
      .set(obj)
      .then(() => {
        console.log("add successfully");
      })
      .catch((err) => console.log(err));
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
    <div>
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
    </div>
  );
};

/* 
การใช้เมธอด doc() ร่วมกับเมธอด set() ใช้สำหรับแก้ไขเอกสารที่อยู่ในคอลเล็กชันจากรหัสเอกสาร แต่ถ้าไม่พบรหัสเอกสารในคอลเล็กชัน ก็จะสร้างเอกสารใหม่ขึ้นมาโดยอัตโนมัติ แต่ถ้าพบรหัสเอกสาร ก็จะนำข้อมูลเอกสารใหม่ไปแทนที่เอกสารเดิม


*/
export default App;
