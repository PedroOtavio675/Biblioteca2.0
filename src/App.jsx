import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CadastroLivro from "./pages/CadastroLivro";
import Casa from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Casa />} />
        <Route path="/CadastroLivro" element={<CadastroLivro />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
