import { TextField } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import validarCPF from "../../validarCPF";
import LoginWindow from "./login";
const apiURl = import.meta.env.VITE_API_URL;
const BoxDados = () => {
  const [form, setForm] = useState({ nome: "", email: "", senha: "", cpf: "", tipoUsuario:"" });
  const [checkSenha, setCheckSenha] = useState("");

   const [tamanhoTelas, setTamanhoTelas] = useState({telaLogin:100, telaCadastro: 400});

  function animacaoMenu() {
   setTamanhoTelas({telaLogin: 400, telaCadastro: 100})
  }
  function animacaoMenu2(){
    setTamanhoTelas({telaLogin: 100, telaCadastro: 400})
  }

  function funcaoTipoUsuario(e){
  setForm({...form, tipoUsuario:""})
 setForm({...form, tipoUsuario: e})
 console.log(form.tipoUsuario)
  }

  const sendformUsuarios = async (e) => {
    e.preventDefault();
    if (
      form.cpf !== "" &&
      form.email !== "" &&
      form.nome !== "" &&
      form.senha !== "" &&
      checkSenha !== ""
    ) {
      const resultCPF = await axios.post(
        `${apiURl}/verificarSeCPFJaExiste`,
        form
      );
      const resultEMAIL = await axios.post(
        `${apiURl}/verificarSeEmailJaExiste`,
        form
      );

      if (resultCPF.data.length === 0 && resultEMAIL.data.length === 0) {
        if (validarCPF(form.cpf) == true) {
          if (form.senha == checkSenha) {
            if (
              form.senha.length >= 8 &&
              /[A-Z]/.test(form.senha) &&
              /\d/.test(form.senha) &&
              /[!@#$%^&*]/.test(form.senha)
            ) {
              try {
                await axios.post(`${apiURl}/registrarUsuario`, form);
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
        } else {
          alert("CPF inválido");
        }
      } else {
        alert("Esse CPF ou email já está cadastrado em nosso banco!");
      }
    } else {
      alert("Complete todos os dados!");
    }
  };

  return (
    <div className="flex w-[90%] sm:w-[500px] md:w-[600px] h-[75%]">
      <LoginWindow tamanhoTelas={tamanhoTelas} animacaoMenu={animacaoMenu}></LoginWindow>
      <div className={`bg-white rounded-r-md transition-[width] duration-1000 ease-in-out flex items-center justify-center flex-col`}
       style={{ width: `${tamanhoTelas.telaCadastro}px` }}>
        <h3 className=" text-center sm:text-[15px] md:text-[24px] text-black flex-wrap">Criar Conta</h3>
        <button onClick={animacaoMenu2} className={tamanhoTelas.telaLogin == 100 ? "hidden" : "w-[65px] bg-slate-800 text-white m-4 rounded-md"}>Cadastre-se</button>
        
        <form onSubmit={sendformUsuarios} className={tamanhoTelas.telaLogin == 100 ? "flex flex-col" : "hidden"}>
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
            label={
              validarCPF(form.cpf) || form.cpf == "" ? "CPF" : "CPF inválido"
            }
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
           <div name="tipoUsuario" className="flex flex-col">
            <label>
              Visitante
              <input
              onClick={(e)=>funcaoTipoUsuario(e.target.value)}
              type="radio" name="tipoUsuario" value="visitante" />
            </label>

            <label>
              Aluno
              <input
               onClick={(e)=>funcaoTipoUsuario(e.target.value)}
              type="radio" name="tipoUsuario" value="aluno" />
            </label>

            <label>
              Professor
              <input 
               onClick={(e)=>funcaoTipoUsuario(e.target.value)}
              type="radio" name="tipoUsuario" value="professor" />
            </label>
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
