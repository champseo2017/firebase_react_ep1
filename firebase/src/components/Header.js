import React, { useState, useEffect, useRef } from "react";
import { auth, firestore, googleProvider } from "../database/firebase";
import "bootstrap/dist/css/bootstrap.min.css";

const Header = () => {
  const [user, setUser] = useState(null);
  const userRef = useRef(firestore.collection("users")).current;
  useEffect(() => {
    const authUnsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      if (!!firebaseUser) {
        userRef.doc(firebaseUser.uid).onSnapshot((doc) => {
          if (doc.data()) {
            const userData = {
              uid: doc.data().uid,
              displayName: doc.data().displayName,
              photoURL: doc.data().photoURL,
              email: doc.data().email,
              created: doc.data().created,
              role: doc.data().role,
            };
            setUser(userData);
          } else {
            setUser(null);
          }
        });
      } else {
        setUser(null);
      }
    });
    return () => {
      authUnsubscribe();
    };
  }, [userRef]);
  const googleLoginHandler = async () => {
    const result = await auth.signInWithPopup(googleProvider);
    if (result) {
      const userRef = firestore.collection("users").doc(result.user.uid);
      const doc = await userRef.get();
      if (!doc.data()) {
        userRef.set({
          uid: result.user.uid,
          displayName: result.user.displayName,
          photoURL: result.user.photoURL
            ? result.user.photoURL
            : "https://via.placeholder.com/150",
          email: result.user.email,
          created: new Date().valueOf(),
          role: "user",
        });
      }
    }
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
    <div className="row mt-4">
      <div className="col-sm-10 mx-auto">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <a className="nav-link" href="/">
                  Home
                </a>
              </li>
            </ul>
            <ul className="navbar-nav mr">
              {!!user ? (
                <div>
                  {user.displayName}{" "}
                  <img
                    src={user.photoURL}
                    alt="user"
                    width="40"
                    height="40"
                    className="img mr-1 rounded-circle"
                  />
                </div>
              ) : null}
              {!!user ? (
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    href="#logout"
                    onClick={signOutHandler}
                  >
                    Logout
                  </a>
                </li>
              ) : (
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    href="#login"
                    onClick={googleLoginHandler}
                  >
                    Google Login
                  </a>
                </li>
              )}
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
};

/* 
1.ลงทะเบียนด้วยอีเมล / รหัสผ่าน
จะใช้เมธอด createUserWithEmailAndPassword(email, password) โดยค่าที่รีเทิร์นกลับมาจากเมธอดนี้จะอยู่ในรูปของออบเจ็กต์ Promide ซึ้งถ้าลงทะเบียนสำเร็จเราก็จะได้ข้อมูลของผู้ใช้กลับมา

 firebase.auth()
 .createUserWithEmailAndPassword(email, password)
 .then((result) => {
    console.log(result.user)
 })
 .catch((err) => {
   console.log(err)
 })

 firebase.auth()
 .createUserWithEmailAndPassword(email, password)
 .then(async (result) => {
   if(result){
      const userRef = firestore.collection("users").
      doc(result.user.uid);
      const doc = await userRef.get();
      if(!doc.data()){
          await userRef.set({
            uid: result.user.uid,
            displayName: result.user.email,
            photoURL: result.user.photoURL,
            email: result.user.email,
            created: new Date().valueOf(),
            role: "user"
          })
      }
   }
 })
 .catch((err) => {
   console.log(err)
 })

 ขั้นตอนที่ 2 เข้าสู่ะบบด้วยอีเมล/รหัสผ่าน
 เมื่อต้องการล็อกอินด้วยอีเมล/รหัสผ่าน จะใช้เมธอด singInWithEmailAndPassword(email, password) 

 firebase.auth()
 .signInWithEmailAndPassword(email, password)
 .then((result) => {
   console.log(result.user)
 })
 .catch((err) => {
   console.log(err)
 })


*/

export default Header;
