import { initializeApp } from "firebase/app";
import { getStorage, ref, getDownloadURL } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDVneEmc9KrV3KW6NqLN4ed44Cuk0quJUM",
  authDomain: "storage-marketplace.firebaseapp.com",
  projectId: "storage-marketplace",
  storageBucket: "storage-marketplace.appspot.com",
  messagingSenderId: "958630977736",
  appId: "1:958630977736:web:a35883292c8ace12d685fd",
  measurementId: "G-ZNXBEY1Q8G"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage, ref, getDownloadURL };