import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CadastroLivro from "./pages/CadastroLivro";
import Casa from "./pages/Home";
import CadastroUsuarios from "./pages/CadastroUsuario";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Casa />} />
        <Route path="/CadastroLivro" element={<CadastroLivro />} />
        <Route path="/CadastroUsuarios" element={<CadastroUsuarios/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
