import * as SQLite from 'expo-sqlite';
//! Change this to you DataBase name
//! Create inside your DataBase Three tables (Users,Orders,Products) and in the same Schema !!!
const db = SQLite.openDatabase('MyDB.db');


export const initDB = () => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS Products (ID INTEGER PRIMARY KEY AUTOINCREMENT, Product_Name TEXT (0, 20)  NOT NULL,Product_Details TEXT (0, 200) NOT NULL,Product_Price   REAL NOT NULL,Product_Rating  INTEGER NOT NULL,Product_Image   TEXT NOT NULL, Catagory TEXT (0, 20) NOT NULL,Stock INTEGER NOT NULL)',
                [],
                () => {
                    resolve()
                },
                (_, error) => {
                    reject(error)
                }
            )
        })
    })
}

//   Get Products
export const getProducts = () => {
    return  new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                'SELECT * FROM Products',
                [],
                (_, result) => {
                    resolve(result.rows._array);
                },
                (_, error) => {
                    reject(error);
                }
            );
        });
        console.log(resolve())
    });
};


// export const loadProducts = () => {
//     getProducts()
//       .then((result) => {
//         setTodos(result);
//       })
//       .catch((error) => {
//         console.log('Error loading Products:', error);
//       });
//   };
