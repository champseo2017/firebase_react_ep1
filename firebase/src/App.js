import React, { useState, useEffect } from "react";
import database from "./database/firebase";
const App = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    let mount = true;
    if (mount) {
      const ref = database.collection("users");
      ref.onSnapshot(
        (snapshot) => {
          let tempDataArray = [];
          snapshot.forEach((doc) => {
            if (doc.exists) {
              tempDataArray = [
                ...tempDataArray,
                {
                  id: doc.id,
                  userName: doc.data().userName,
                  age: doc.data().age,
                },
              ];
            }
          });
          setData((oldDataArray) => tempDataArray);
        },
        (err) => {
          console.log(err);
        }
      );
    }
    return () => {
      return (mount = false);
    };
  }, []);

  return (
    <div>
      <div
        style={{
          width: "80%",
          marginLeft: 20,
        }}
      >
        <table>
          <tbody>
          {data.map((item, index) => {
            return (
              <tr
                key={index}
                style={
                  index % 2 === 0
                    ? {
                        backgroundColor: "lightgray",
                      }
                    : null
                }
              >
                <td>{item.id}</td>
                <td>{item.userName}</td>
                <td>{item.age}</td>
              </tr>
            );
          })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

/*
 */

export default App;
