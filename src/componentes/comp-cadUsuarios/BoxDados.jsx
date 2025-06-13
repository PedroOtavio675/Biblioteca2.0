import { TextField } from "@mui/material";
import { useState } from "react";
import axios from "axios";

const BoxDados = () => {
  const [form, setForm] = useState({ nome: "", email: "", senha: "", cpf: "" });
  const [checkSenha, setCheckSenha] = useState("");

  function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, ""); // Remove tudo que não for número

    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) {
      return false; // CPF com 11 dígitos iguais ou fora do padrão
    }

    let soma = 0;
    let resto;

    // Valida 1º dígito
    for (let i = 1; i <= 9; i++) {
      soma += parseInt(cpf.charAt(i - 1)) * (11 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.charAt(9))) return false;

    // Valida 2º dígito
    soma = 0;
    for (let i = 1; i <= 10; i++) {
      soma += parseInt(cpf.charAt(i - 1)) * (12 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.charAt(10))) return false;

    return true;
  }

  const sendformUsuarios = async (e) => {
    e.preventDefault();

    const resultCPF = await axios.post(
      "http://localhost:3000/verificarSeCPFJaExiste",
      form
    );
    const resultEMAIL = await axios.post("http://localhost:3000/verificarSeEmailJaExiste", form)

    if (resultCPF.data.length === 0 && resultEMAIL.data.length === 0) {
      if(validarCPF(form.cpf) == true){
      if (form.senha == checkSenha) {
        if (
          form.senha.length >= 8 &&
          /[A-Z]/.test(form.senha) &&
          /\d/.test(form.senha) &&
          /[!@#$%^&*]/.test(form.senha)
        ) {
          try {
            await axios.post("http://localhost:3000/registrarUsuario", form);
            alert(`Usuário ${form.nome} foi cadastrado`);
          } catch (err) {
            alert(err);
          }
        } else {
          alert("Senha inválida!");
        }
      } else {
        alert("As senhas não correspondem");
      }
    }else{
      alert("CPF inválido")
    }
    } else {
      alert("Esse CPF ou email já está cadastrado em nosso banco!");
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
            type="number"
            id="standard-basic-cpf"
            variant="standard"
            value={form.cpf}
            onChange={(e) => {
              setForm({ ...form, cpf: e.target.value });
            }}
            label={validarCPF(form.cpf) || null ? "CPF" : "CPF inválido"}
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
            onChange={(e) => setCheckSenha(e.target.value)}
            id="standard-basic-senha-confirmar"
            label={
              checkSenha == form.senha
                ? "Confirme sua senha"
                : "Senhas não combinam"
            }
            className="placeholder-red-500"
            variant="standard"
          ></TextField>
          <div className="text-[12px] text-red-600">
            <p className={form.senha.length > 8 ? "hidden" : ""}>
              {form.senha.length < 8
                ? "Deve conter pelo menos 8 caracteres"
                : ""}
            </p>
            <p className={/[A-Z]/.test(form.senha) && "hidden"}>
              {/[A-Z]/.test(form.senha) ? "" : "Letra maiúscula"}
            </p>
            <p className={/\d/.test(form.senha) && "hidden"}>
              {/\d/.test(form.senha) ? "" : "Números"}
            </p>
            <p className={/[!@#$%^&*]/.test(form.senha) && "hidden"}>
              {/[!@#$%^&*]/.test(form.senha) ? "" : "Caracteres especiais"}
            </p>
          </div>
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
