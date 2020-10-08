import React, { useState, useEffect } from "react";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import LoginForm from "./components/LoginForm";

const App = () => {
  return (
    <div className="container">
      <LoginForm />
    </div>
  );
};
export default App;
