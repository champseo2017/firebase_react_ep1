import React, { useState, useEffect } from "react";
import { auth } from "./database/firebase";
import SignIn from "./SignIn";

const App = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const authUnsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
      } else {
        setUser(null);
      }
    });
    return () => {
      authUnsubscribe();
    };
  }, [user]);

  return (
    <div className="App">
      <SignIn />
      {user ? (
        <div>
          <hr />
          <div>uid: {user.uid}</div>
          <div>name: {user.displayName}</div>
          <div>email: {user.email}</div>
          <img
            src={user.photoURL}
            alt="user"
            style={{
              width: 50,
              height: 50,
            }}
          />
        </div>
      ) : null}
    </div>
  );
};
export default App;
