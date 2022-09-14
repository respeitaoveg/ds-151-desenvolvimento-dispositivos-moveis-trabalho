import { initializeApp } from "firebase/app";
import { getDatabase } from 'firebase/database'

const firebaseConfig = {
  apiKey: "AIzaSyANvImJB1sy9qw5K-5ZEx6dbYTKUx8p0zI",
  authDomain: "ds-151-trabalho.firebaseapp.com",
  projectId: "ds-151-trabalho",
  storageBucket: "ds-151-trabalho.appspot.com",
  messagingSenderId: "23190299700",
  appId: "1:23190299700:web:fb56f315367455a9ee5661",
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app)
