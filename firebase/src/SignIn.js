import React from "react";
import { auth, googleProvider } from "./database/firebase";
export default function SignIn() {
  const googleLoginHandler = async () => {
    const userCredential = await auth.signInWithPopup(googleProvider);
    console.log(userCredential.user);
  };

  return (
    <div>
      <button onClick={googleLoginHandler}>Google Login</button>
    </div>
  );
}
