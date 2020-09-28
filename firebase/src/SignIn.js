import React from "react";
import { auth, googleProvider } from "./database/firebase";
/* 
การล๊อกเอาต์ออกจากระบบ
หลังจากล๊อกอินด้วย Google แล้วหากต้องการล็อกเอาต์ออกจากระบบ จะต้องเรียกใช้งานเมธอด auth.signOut() 

*/
export default function SignIn() {
  const googleLoginHandler = async () => {
    const userCredential = await auth.signInWithPopup(googleProvider);
    console.log(userCredential.user);
  };

  const logOut = () => {
      auth.signOut()
      .then(() => {
          console.log("Logout Out")
      })
      .catch((err) => {
          console.log("LOgout Not Ok." + err);
      })
  }

  return (
    <div>
      <button onClick={googleLoginHandler}>Google Login</button>
    </div>
  );
}

