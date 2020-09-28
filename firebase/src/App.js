import React, { useState, useEffect, Component } from "react";
import database from "./database/firebase";
import User from "./User";
import Form from "./Form";
const App = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    let mount = true;
    let unsubscribe = null
    if (mount) {
      const ref = database.collection("users");
      const query = ref.orderBy("age", "desc");
      unsubscribe = query.onSnapshot(
        (snapshot) => {
          let tempDataArray = [];
          snapshot.forEach((doc) => {
            tempDataArray = [
              ...tempDataArray,
              {
                id: doc.id,
                userName: doc.data().userName,
                age: doc.data().age,
              },
            ];
          });
          setData((oldDataArray) => tempDataArray);
        },
        (err) => {
          console.log(err);
        }
      );
    }
    return () => {
      mount = false;
      unsubscribe();
    };
  }, []);

  const styles = {
    header: {
      display: "flex",
      flexDirection: "row",
      minHeight: 100,
      alignItems: "center",
      justifyContent: "center",
    },
  };

  const addUserHandler = (obj) => {
    const ref = database.collection("users");
    ref.add(obj).then(() => {
      console.log("add successfully");
    });
  };

  const deleteHandler = (id) => {
    const ref = database.collection("users");
    ref
      .doc(id)
      .delete()
      .then(() => {
        console.log("deleted");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const editHandler = (id, obj) => {
    console.log(id)
    const ref = database.collection("users");
    ref
      .doc(id)
      .set(obj)
      .then(() => {
        console.log("---updated---");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div stye={styles.header}>
        <Form addData={addUserHandler} />
      </div>
      <div style={styles.header}>
        <div
          style={{
            width: "80%",
          }}
        >
          {data.map((item, index) => {
            return (
              <div key={index + 1}>
                <User
                  data={item}
                  delete={() => deleteHandler(item.id)}
                  edit={(id, obj) => editHandler(id, obj)}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default App;
/*
 */
