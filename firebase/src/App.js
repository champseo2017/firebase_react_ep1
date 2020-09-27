import React, { useState, useEffect } from "react";
import database from "./database/firebase";
const App = () => {
  const [productLists, setProductLists] = useState([]);
  const [currentCursor, setCurrentCursor] = useState(null);
  useEffect(() => {
    let mount = true;
    if (mount) {
      const firstPageRef = database
        .collection("products")
        .orderBy("pid", "asc")
        .limit(3);

      firstPageRef.get().then((querySnapshot) => {
        let tempLists = [];
        querySnapshot.docs.forEach((doc) => {
          if (doc.exists) {
            const currentProduct = {
              pid: doc.data().pid,
              name: doc.data().name,
              price: doc.data().price,
            };
            tempLists = [...tempLists, currentProduct];
          }
        });
        setProductLists((prv) => tempLists);
        const currentLength = querySnapshot.docs.length;
        const currentCursorFromFirstPage =
          querySnapshot.docs[currentLength - 1];
        setCurrentCursor(currentCursorFromFirstPage);
      });
    }

    return () => {
      return (mount = false);
    };
  }, []);

  const onMoreProducts = () => {
    const nextPageRef = database
      .collection("products")
      .orderBy("pid", "asc")
      .limit(3);

    nextPageRef.get().then((querySnapshot) => {
      const currentLength = querySnapshot.docs.length;
      if (!currentLength) {
        return;
      }
      const query = nextPageRef.startAfter(currentCursor);
      query.get().then((querySnapshot) => {
        let tempNewArray = [];
        querySnapshot.forEach((doc) => {
          if (doc.exists) {
            tempNewArray = [
              ...tempNewArray,
              {
                pid: doc.data().pid,
                name: doc.data().name,
                price: doc.data().price,
              },
            ];
          }
        });
        setProductLists([...productLists, ...tempNewArray]);
        const currentCursorFromNextPage = querySnapshot.docs[currentLength - 1];
        setCurrentCursor(currentCursorFromNextPage);
      });
    });
  };

  return (
    <div>
      <ul>
        {productLists.map((product, index) => {
          return (
            <li key={index}>
              # {product.pid}:{product.name}: % {product.price}
            </li>
          );
        })}
      </ul>
      <hr />
      {currentCursor ? (
        <button onClick={onMoreProducts}>More Products...</button>
      ) : (
        <div>No more product</div>
      )}
    </div>
  );
};

/* 
เนื่องจาก firestore เป็นข้อมูลแบบเรียลไทม์ เมื่อมีการเปลียนแปลงข้อมูลในฐานข้อมูล firestore ก็จะส่งสัญญาณมาบอกกับไคลเอนต์ที่เชื่อมต่ออยู่ว่าข้อมูลมีการเปลียนแปลงไปแล้ว การสร้าง collectionReference ออบเจ็กต์ เพื่อติดต่อไปยังคอลเล็กชัน จะเป็นเหมือนกับการ subsctiber เพื่อติดตามข้อมูลที่อยู่ในคอลเล็กชันนั้นๆ หากข้อมูลในคอลเล็กชันเปลียนแปลง firestore ก็จะแจ้งให้ทราบทันที เราจึงสามารถนำข้อมูลล่าสุดมาแสดงผล หรือนำไปใช้งานในแบบเรียลไทม์ได้

วิธีแสดงข้อมูลล่าสุดจากคอลเล็กชัน (เลือกทั้งคอลเล็กชัน หรือเลือกเพียงบางส่วนด้วยคำสั่งคิวรี) จะใช้เมธอด onSnapshot ซึ้งมีรูปแบบการใช้งานเป็น ดังนี้

รูปแบบ
collectionReference.onSnapshot(onNext:, onErr:, onComplete:)
- collectionReference คือ ออบเจ็กต์ที่ใช้ติดต่อกับคอลเล็กชันที่ต้องการฃ
- onSnapshot คือเมธอดที่ใช้กำหนด Event Listener เพื่อตรวจสอบข้อมูลในคอลเล็กชัน หากข้อมูลมีการเปลียนแปลง (เกิดอีเวนต์ QuerySnapshot) ก็จะรันโค้ดคำสั่งที่กำหนด

- onNext เป็นฟังก์ชัน callback ที่จะถูกเรียกใช้งานเมื่อ QuerySnapshot ออบเจ็กต์พร้อมใช้งาน
- onErr เป็นฟังก์ชัน callback ที่จะถูกเรียกใช้งานเมื่อเกิดข้อผิดพลาด
- onComplete เป็นฟังก์ชัน callback ที่จะถูกเรียกใช้งานเมื่ออีเวนต์ Query Snapshot เกิดสมบูรณ์แล้ว แต่โดยปกติอีเวนต์ QuerySnapshot จะเกิดขึ้นต่อเนื่องไม่มีวันสมบ฿รณ์ ดังนั้นเราจึงไม่ได้ใช้งานในส่วนของ onComplete

const ref = firestore.collection('users')
ref.onSnapshot (
  (snapshot) => {
    console.log(snapshot)
  },
  (err) => {
    consol.log(err)
  }
)

const ref = database.collection('users')
ref.onSnapshot(
  (snapshot) => {
    snapshot.forEach(doc => {
      console.log(doc.id)
      console.log(doc.data().name)
    })
  },
  (err) => {
    console.log(err)
  }
)
note
สังเกตว่า ในการวนลูปเข้าไปยังทุกๆ เอกสารใน querySnapshot ออบเจ็กต์การแสดงค่า id ของเอกสาร จะแตกต่างจากการแสเงค่าจากฟิลด์ในเอกสารดังตัวอย่างต่อไปนี้

- ค่า id สามารถใช้พร็อพเพอร์ตี้ id เช่น doc.id
- ค่าจากฟิลด์ต่างๆ ในเอกสาร จะต้องเรียกด้วยเมธอด data() แล้วตามด้วยชื่อฟิลด์ เช่น ถ้าต้องการแสดงค่าจากฟิลด์ name ให้ใช้คำสั่ง doc.data().name

*/

export default App;
