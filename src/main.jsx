import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";
import App from "./App.jsx";
import Login from "./Login.jsx";
import Upload from "./Upload.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/upload" element={<Upload />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  </BrowserRouter>
);
