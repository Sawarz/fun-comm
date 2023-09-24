import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAHaq_-VwY0cZOx9Ku-HqUId4s9Ll8S-U4",
  authDomain: "fun-comm.firebaseapp.com",
  projectId: "fun-comm",
  storageBucket: "fun-comm.appspot.com",
  messagingSenderId: "924276945918",
  appId: "1:924276945918:web:63662540b4c6d9bc75c6af"
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);