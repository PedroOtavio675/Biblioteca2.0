import { TextField } from "@mui/material";
import { useState } from "react";
import axios from "axios";

const BoxDados = () => {
  const [form, setForm] = useState({ nome: "", email: "", senha: "" });

  const sendformUsuarios = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:3000/registrarUsuario", form);
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div className="flex">
      <div className="bg-slate-800 rounded-l-md w-[200px] h-[400px] flex items-center justify-center"></div>
      <div className="bg-white rounded-r-md w-[400px] h-[400px] flex items-center justify-center flex-col">
        <h3 className="text-[20px]">Criar Conta</h3>
        <form onSubmit={sendformUsuarios} className="flex flex-col">
          <TextField
            id="standard-basic-nome"
            label="Nome"
            variant="standard"
            value={form.nome}
            onChange={(e) => setForm({ ...form, nome: e.target.value })}
          ></TextField>
          <TextField
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            type="email"
            id="standard-basic-email"
            label="Email"
            variant="standard"
          ></TextField>
          <TextField
            value={form.senha}
            onChange={(e) => setForm({ ...form, senha: e.target.value })}
            type="password"
            
            id="standard-basic-senha"
            label="Senha"
            variant="standard"
          ></TextField>
          <TextField
            type="password"
            id="standard-basic-senha-confirmar"
            label="Confirme sua senha"
            variant="standard"
          ></TextField>
          <button
            type="submit"
            className="w-[80px] h-[35px] bg-slate-950 text-white m-4 rounded-md"
          >
            Criar
          </button>
        </form>
      </div>
    </div>
  );
};

export default BoxDados;
