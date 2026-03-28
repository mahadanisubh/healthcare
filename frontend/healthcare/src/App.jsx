import { BrowserRouter, Routes, Route } from "react-router-dom";
import Form from "./pages/Form.jsx";
import Track from "./pages/Track.jsx";
import Department from "./pages/Department.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/track" element={<Track />} />
        <Route path="/department" element={<Department/>} />
      </Routes>
    </BrowserRouter>
  );
}