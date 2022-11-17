
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import Main from "./components/Main/Main";
import './scss/app.scss';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC6xI5fg8jCN_2VIngbzyuqaffQG6JLEK8",
  authDomain: "todo-76ef3.firebaseapp.com",
  projectId: "todo-76ef3",
  storageBucket: "todo-76ef3.appspot.com",
  messagingSenderId: "765530665949",
  appId: "1:765530665949:web:c50b6ecba5fce2e3183c34"
};


const app = initializeApp(firebaseConfig);

function App() {
  return (
    <Main />
  );
}

export default App;
