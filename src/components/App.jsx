import { useState } from "react";
import Header from "./Header/Header";
import Main from "./MainPage/MainPage";
import Footer from "./Footer/Footer";


function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="page">
      <Header />
      
      <Main />

      <Footer />
      
    </div>
  );
}

export default App;
