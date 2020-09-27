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

export default App;
