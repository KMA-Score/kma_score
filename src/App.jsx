import "./index.css";
import Home from "./views/Home";
import StudentPage from "./views/StudentPage";
import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/student/:studentId" element={<StudentPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
