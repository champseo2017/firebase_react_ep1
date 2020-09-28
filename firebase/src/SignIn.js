import React, { useState, useEffect } from "react";
import { auth, googleProvider } from "./database/firebase";
/* 
ตัวอย่างการ Login และ LogOut

กรณีที่ 1 เมื่อผู้ใช้ล็อกอินด้วย Google สำเร็จ เมธอด auth.onAuthStateChange() จะถูกเรียกใช้งาน เราก็จะได้ข้อมูลของผู้ใช้มาใช้งาน (อออบเจ็กต์ firebase.user) โดยเมธอดนี้จะรีเทิร์นค่ากลับมาเป็นฟังก์ชันสำหรับ unsubscribe

- authUnsubscribe คือ ฟังก์ชันสำหรับ unsubscribe สำหรับยกเลิกการติดตามสถานะจาก firebase
- onAuthStateChanged คือเมธอดที่ถูกเรียกใช้งานเมื่อมีการเปลี่ยนแปลงสถานะของการล็อกอิน ล๊อกเอาต์

- user คือออบเจ็กต์ ที่เก็บข้อมูลของผู้ใช้ เมื่อล๊อกอินสำเร็จ

กรณีที่ 2 เมื่อผู้ใช้ล๊อกเอาต์ออกจากระบบ เมธอด auth.onAuthStateChange() จะถูกเรียกใช้งาน แต่จะไม่มีข้อมูลผู้ใช้กลับมา

*/
export default function SignIn() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const authUnsubscribe = auth.onAuthStateChanged((user) => {
        console.log(user);
      setUser(user);
    });

    return () => {
      authUnsubscribe();
    };
  }, []);

  const googleLoginHandler = async () => {
    auth.signInWithPopup(googleProvider);
  };

  const signOutHandler = () => {
    auth
      .signOut()
      .then(() => {
        console.log("Logout OK");
      })
      .catch((err) => {
        console.log("Logout Not OK" + err);
      });
  };

  return (
    <div>
      {!user ? (
        <button onClick={googleLoginHandler}>Google</button>
      ) : (
        <button onClick={signOutHandler}>Logout</button>
      )}
    </div>
  );
}
