import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAgTa--qjqdAVZuJ0h8L5KtIDAabA55WBM",
  authDomain: "task-manager-cloud.firebaseapp.com",
  projectId: "task-manager-cloud",
  storageBucket: "task-manager-cloud.appspot.com",
  messagingSenderId: "996047637906",
  appId: "1:996047637906:web:0263eb5f50fe719afb454b",
};

const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;
