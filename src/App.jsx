import "./index.css";
import Home from "./views/Home";
import StudentPage from "./views/StudentPage";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route exact path="/student/:studentId" element={<StudentPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
