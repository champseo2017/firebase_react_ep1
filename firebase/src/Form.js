import React, { useState } from "react";
const Form = ({ addData }) => {
  const [userName, setUserName] = useState("");
  const [age, setAge] = useState("");
  const styles = {
    container: {
      alignSelf: "column",
    },
    list: {
      marginTop: "10",
      borderColor: "gray",
      borderWidth: 1,
      textAlign: "left",
    },
    title: {
      color: "blue",
    },
    age: {
      color: "red",
    },
  };

  return (
    <div style={styles.container}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addData({
            userName,
            age,
          });
        }}
      >
        <input
          type="text"
          value={userName}
          onChange={(e) => {
            setUserName(e.target.value);
          }}
          placeholder="user name"
        />
        <input
          type="text"
          value={age}
          onChange={(e) => {
            setAge(e.target.value);
          }}
          placeholder="age"
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Form;
