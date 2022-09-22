import "./index.css";
import Home from "./views/Home";
import StudentPage from "./views/StudentPage";
import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route exact path="/student/:studentId" element={<StudentPage />} />
      </Routes>
    </>
  );
}

export default App;
