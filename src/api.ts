// В данном случае мы не используем бандлеры, поэтому в импорте нужно указывать ссылки на веб-ресурсы Firebase
// import { firebaseConfig } from "firebaseConfig";
import { initializeApp } from 'firebase/app';
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';

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

const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
const db = getFirestore(app);

const userCollection = 'users';

// CRUD - Create, Read, Update, Delete
// GET, POST, PUT, PATCH, DELETE

export const getUsers = async () => {
  const result: User[] = [];
  try {
    const q = query(collection(db, userCollection));
    // const q = query(collection(db, userCollection), where("email", '==', "tusya@gmail.com"));
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