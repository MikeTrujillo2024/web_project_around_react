import { useState,useEffect } from "react";
import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import {api} from "../utils/api";
import CurrentUserContext from "../context/CurrentUserContext";


function App() {

  const [currentUser,setCurrentUser] = useState({});

 useEffect(()=>{
  api.getUserInfo()
  .then((data)=>{
   setCurrentUser(data)
  })
  .catch((error)=>{
    console.log(` error user -> ${error}`);
  })
},[]);
  return (
    <CurrentUserContext.Provider value={currentUser}>
    <>    
      <Header />
      
      <Main />

      <Footer />
      
    </>
    </CurrentUserContext.Provider>
  );
}

export default App;
