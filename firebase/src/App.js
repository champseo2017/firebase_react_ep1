import React, { useState, useEffect } from "react";
import { auth } from "./database/firebase";
import Header from "./components/Header";

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
    <div className="container">
      <Header />
    </div>
  );
};
export default App;
