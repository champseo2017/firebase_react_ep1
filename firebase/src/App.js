import React, { useState, useEffect, Component } from "react";
import database from "./database/firebase";
export default class App extends Component {
  unsubscribe = null;
  componentDidMount() {
    const usersRef = database.collection("users");
    this.unsubscribe = usersRef.onSnapshot((snapshot) => {
      console.log(snapshot.docs);
    })
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    return <div></div>
  }
}
/* 
ยกเลิกติดตามเมื่อไม่ได้ใช้ข้อมูล
ในการใช้งานข้อมูลในแบบเรียลไทม์ เราจะกำหนด event listener เพื่อรอรับข้อมูลจากฐานข้อมูล (subscribe) แต่เมื่อใดที่เราไม่ได้ใช้งานข้อมูลแล้ว ก็ควรจะยกเลิกการติดตาม (Unsubscribe)

การเรียกเมธอด onSnapshot() เพื่อติดตามข้อมูลแบบเรียลไทม์นั้น ค่าที่รีเทิร์นกลับมาจะเป็นฟังก์ชันสำหรับใช้ยกเลิกการติดตามข้อมูลจาก firestore(unsubscribe) ดังนั้นเราสามารถเรียกใช้ฟังก์ชันนี้เพื่อยกเลิกการติดตามได้

รูปแบบ
const unsub = firestore.collection(collectionName).onSnapshot()

- unsub เป็นฟังก์ชันที่ใช้สำหรับยกเลิกการติดตามข้อมูลในคอลเล็กชัน
- firestore เป็นออบเจ็กต์ที่ใช้ติดต่อ firestore

หากเป็นคลาสคอมโพเนต์ เมื่อต้องการนกเลิกการติดตามข้อมูลจาก firestore เราจะเรียกฟังก์ชันเพื่อยกเลิกการติดตาม componentWillUnmount() ดังตัวอย่างต่อไปนี้

*/
