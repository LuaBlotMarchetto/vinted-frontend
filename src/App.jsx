import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import axios from "axios";
import "./App.css";

//PAGES
import Home from "./pages/Home";
import Offer from "./pages/Offer";

//COMPOSANTS
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://lereacteur-vinted-api.herokuapp.com/offers"
        );
        console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, []);

  return isLoading ? (
    <span>En cours de chargement...</span>
  ) : (
    <>
      <Router>
        <Header></Header>
        <Home data={data} setData={setData}></Home>
        <Footer></Footer>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/offer" element={<Offer />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
