import React, { useState, useEffect } from "react";
import { auth, googleProvider } from "./database/firebase";
/* 
แสดงชื่ออีเมลและรูปภาพของผู้ใช้หลังล็อกอิน
เมื่อล็อกอินสำเร็จ เราก็จะได้ออบเจ็กต์ user มาใช้งานในโปรเจ็กต์ เช่น แสดงชื่อผู้ใช้คนปัจจุบัน แสดงรูปภาพ แสดงอีเมลของผู้ใช้ อื่นๆ 

*/

export default function SignIn() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const authUnsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => {
      authUnsubscribe();
    };
  }, []);

  const googleLoginHandler = async () => {
    auth.signInWithPopup(googleProvider).then((result) => {
        console.log(result);
    })
    .catch((err) => {
        console.log(err);
    })
  };

  const signOutHandler = () => {
    auth
      .signOut()
      .then(() => {
        console.log("Logout OK");
      })
      .catch((err) => {
        console.log("Logout Not OK." + err);
      });
  };
  return (
    <div>
      {!user ? (
        <button onClick={googleLoginHandler}>Google Login</button>
      ) : (
        <button onClick={signOutHandler}>Logout</button>
      )}
    </div>
  );
}