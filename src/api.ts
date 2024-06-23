import { useState } from 'react';
// import { signInWithEmailAndPassword, getAuth} from "firebase/auth";
// import { createUserWithEmailAndPassword, updateProfile } from '@firebase/auth';
// import { StringFormat } from '@firebase/storage';
import { initializeApp } from 'firebase/app';

import { collection,
         getDocs,
         getDoc,
         getFirestore, 
         query,
         where,
         orderBy,
         limit,
         addDoc, 
         doc, 
         updateDoc, 
         deleteDoc, 
         deleteField, 
         setDoc,
         serverTimestamp,
        } from 'firebase/firestore';

// Это конфигурация Firebase, у каждого проекта она своя. Её нужно скопировать из консоли вашего проекта
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID
};

interface User {
  email: string;
  password: string;
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
const userCollection = 'users';

//\\
const collectionRef = collection(db, 'users');

// const [users, setUsers] = useState([]);

//\\

 // ADD FUNCTION
 async function addUser() {
  // const owner = currentUser ? currentUser.uid : 'unknown';
  // const ownerEmail = currentUser ? currentUser.email : 'unknown';

  const newUser = {
    userName: "e",
    desc: "created by function createUser",
    id: 5,  //uuidv4(),
    email: "dfg@gh.com",
    createdAt: serverTimestamp(),
    lastUpdate: serverTimestamp(),
  };

  try {
    const userReference = doc(collectionRef, "newUser.id");
    await setDoc(userReference, newUser);
  } catch (error) {
    console.error(error);
  }
}

addUser(); // --  Не работает


//email
// "tusya@gmail.com"
// (string)

// passworld
// "tustua"
//\\

// CRUD - Create, Read, Update, Delete
// GET, POST, PUT, PATCH, DELETE

export const getUsers = async () => {
  const result: User[] = [];
  try {
    //const q = query(collection(db, userCollection));
    const q = query(collection(db, userCollection), where("first", '==', "Ada"));
    const docsSnapshot = await getDocs(q);

    docsSnapshot.forEach((doc) => {
      const data = doc.data() as User;
      result.push(data);
    });
  } catch (error) {
    console.error(error);
  }

  console.log(result);
  return result;
}


//\\\\\\
// получить отдельный документ по его идентификатору
async function getDocument(collectionName: string, documentId: string) {
  const documentRef = doc(db, collectionName, documentId);
  const documentSnapshot = await getDoc(documentRef);
    if (documentSnapshot.exists()) {
      console.log('Document data:', documentSnapshot.data());
      } else {
      console.log('No such document');
      }
    }
//  const d = getDocument("users", "123");
//  console.log(d);
//\\\\\\



//\\\\\\
//получить все документы в коллекции
async function getAllDocuments(collection_name: string) {
    const collectionRef = collection(db, collection_name);
    const querySnapshot = await getDocs(collectionRef);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, '=>', doc.data());
    });
  }

  console.log(getAllDocuments("users"))
//\\\\\

//delete User by  ID  \\\\\\\\
//await deleteDoc(getUsers());
const deleteUserByID = (uid: string) => {
  const docRef = doc(db, "users", uid);
  deleteDoc(docRef)
};

deleteUserByID("2Pp6WkPJxnqMQugwJ6mS");
// OK!!\\\\\\\

//delete User by field
// const deleteUserByField = (field: string, fieldValue: string) => {
//   const docRef = doc(db, "users", uid);
//   deleteDoc(docRef)
// }


// await deleteDoc(doc(db, "users", "Ada"));

//Установите данные документа внутри коллекции, (create)
//явно указав идентификатор документа. !
//!! перезапись с тем же id  !!!                                   
 export const createUserWithID = async (collectionNaame: string,
                                        id: string,
                                        data: object) => {  
  try {
     await 
     setDoc(doc(db, collectionNaame, id), data
  );
    console.log("Document written with special ID: ", id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

// let c = {
//  "name": "Van",
//  "age": 44,
//  "email": "vanZab@yandex.ru",
//  "password": "ffgghh1122"
// }
// createUserWithID("users", "1223", c) ;
// createUserWithID("users", "5667", {"type": "mio", "age": "45"});

//\\\\\
//add user
//Добавьте новый документ в коллекцию. 
//В этом случае Cloud Firestore автоматически генерирует идентификатор документа.
export const createUser = async (profile: object) => {
  try {
    // const a = Object.keys(profile);
    const docRef = await addDoc(collection(db, "users"), profile
  );
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

// createUser({login: "Al",
//   password: "sim-sim"
// });

// createUser({});


// \\\\\\
