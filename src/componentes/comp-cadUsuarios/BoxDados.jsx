import { TextField } from "@mui/material";
import { useState } from "react";
import axios from "axios";

const BoxDados = () => {
  const [form, setForm] = useState({ nome: "", email: "", senha: "" });
  const [checkSenha, setCheckSenha] = useState("")

  const sendformUsuarios = async (e) => {
    e.preventDefault();
    
   const result = await axios.post("http://localhost:3000/verificarSeUsuarioJaExiste", form)
      if(result.data.length === 0){
    if(form.senha == checkSenha){
      if(form.senha.length >= 8 && /[A-Z]/.test(form.senha) && /\d/.test(form.senha) && /[!@#$%^&*]/.test(form.senha)){
 try {
      await axios.post("http://localhost:3000/registrarUsuario", form);
      alert(`Usuário ${form.nome} foi cadastrado`)
    } catch (err) {
      alert(err)
    }
  }else{
    alert("Senha inválida!")
  }
    }else{
      alert("As senhas não correspondem")
    }

  }else{
    alert("Esse email já está cadastrado em nosso banco!")
  }
}

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
            value={checkSenha}
            onChange={(e)=>setCheckSenha(e.target.value)}
            id="standard-basic-senha-confirmar"
            label={checkSenha == form.senha ? "Confirme sua senha" : "Senhas não combinam"}
            className="placeholder-red-500"
            variant="standard"
          ></TextField>
          <p className="text-[12px] text-red-600">
            <p className={form.senha.length  > 8 && "hidden"}>{form.senha.length  < 8 ? "Deve conter pelo menos 8 caracteres" : ""}</p>
          <p className={/[A-Z]/.test(form.senha) && "hidden"}>{/[A-Z]/.test(form.senha) ? "" : "Letra maiúscula"}</p>
          <p className={/\d/.test(form.senha) && "hidden"}>{/\d/.test(form.senha) ? "" : "Números"}</p>
          <p className={/[!@#$%^&*]/.test(form.senha) && "hidden"}>{/[!@#$%^&*]/.test(form.senha) ? "":"Caracteres especiais"}</p>
          </p>
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
