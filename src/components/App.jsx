import { useState } from "react";
import Header from "./Header/Header";
import Main from "./MainPage/MainPage";
import Footer from "./Footer/Footer";


function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Header />
      
      <Main />

      <Footer />
      
    </>
  );
}

export default App;
