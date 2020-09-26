import React from "react";
function App() {
  const checkAuth = (id, pass) => {
    return new Promise((resolve,reject) => {
      setTimeout(() => {
        const authData = "cccc1";
        console.log("User authenicated");
        resolve({
          id: id,
          pass: pass,
          auth: authData,
        });
      }, 2000);
    });
  };

  const getStudent = (auth) => {
    return new Promise((resolve,reject) => {
      setTimeout(() => {
        const data = {
          name: "Jeerawuth",
          permission: "admin",
        };
        resolve(data);
      }, 2000);
    });
  };

  const getTheResult = async () => {
    try {
      const auth = await checkAuth(1, "mypassword");
      const data = await getStudent(auth);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  getTheResult();
  return <div className="App">hello</div>;
}

/* 
async/await เป็นวิธีเขียนโค้ด Asynchronous ที่ให้ความรู้สึกว่ากำลังเขียนโค้ดแบบ Synchronous อยู่ การใช้คำสั่ง await เป็นการบอกให้ทราบว่า ต้องรอให้ Asynchronnous ทำงานเสร็จก่อน จึงค่อยทำคำสั่งในบรรทัดถัดไป


*/

export default App;
