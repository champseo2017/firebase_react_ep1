import React, { useState, useEffect } from "react";
import { auth, googleProvider } from "./database/firebase";
/* 
พร็อพเพอร์ตี้ใน User ออบเจ็กต์
เมื่อล็อกอินสำเร็จ เราจะได้ user ออบเจ็กต์มาใช้งาน ซึ้งภายในออบเจ็กต์นี้จะมีพร็อพเพอร์ตี้ๆ มากมาย ซึ้งพร็อพเพอร์ตี้ที่ใช้งานบ่อยๆ มีดังนี้

- พร็อพเพอร์ตี้ uid เก็บค่าไอดีของผู้ใช้แต่ละคนที่ไม่ซ้ำกัน
- พร็อพเพอร์ตี้ displayName เก็บข้อความที่ใช้แสดงชื่อผู้ใช้
- พร็อพเพอร์ตี้ email เก็บอีเมลของผู้ใช้
- พร็อพเพอร์ตี้ photoURL เก็บ url สำหรับลิงค์ไปยังภาพประจำตัวของผู้ใช้

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
