// import { useState } from "react";
import { TextField } from "@mui/material";
import axios from "axios";
import { useState } from "react";
const apiURl = import.meta.env.VITE_API_URL;
const LoginWindow = (props) => {
  const [formLogin, setFormLogin] = useState({
    emailLogin:"",
    senhaLogin:""
  })

  const  enviarDadosLogin = async (event)=>{
    event.preventDefault()
    const result = await axios.post(`${apiURl}/loginUsuario`, formLogin)
    localStorage.setItem("login",JSON.stringify(result.data))
  }
  return (
    <div
      className={`bg-slate-800 text-white rounded-l-md transition-[width] duration-1000 ease-in-out flex items-center justify-center`}
      style={{ width: `${props.tamanhoTelas.telaLogin}px` }}
    >
      <div className="flex items-center justify-center flex-col">
        <h4
          className={
            props.tamanhoTelas.telaLogin == 400 ? "hidden" : "text-center"
          }
        >
          Já esta cadastrado?
        </h4>
        <button
          onClick={props.animacaoMenu}
          className={
            props.tamanhoTelas.telaLogin == 400
              ? "hidden"
              : "bg-white text-black rounded-md p-2 m-4"
          }
        >
          Login
        </button>
        <div
          className={
            props.tamanhoTelas.telaLogin == 400 ? "text-center" : "hidden"
          }
        >
          <h3 className="mb-[40px]"> Login</h3>
          <form onSubmit={enviarDadosLogin} className="flex flex-col">
            <input 
            type="text" 
            className="mb-[40px] border-b-[2px]" 
            placeholder="Email"
            value={formLogin.emailLogin}
            onChange={(e)=>setFormLogin({...formLogin, emailLogin: e.target.value})}
            />
            <input 
            type="password" 
            className=" border-b-[2px]"
            placeholder="Senha" 
            value={formLogin.senhaLogin}
            onChange={(e)=>setFormLogin({...formLogin, senhaLogin: e.target.value})}
            />
            <button type="submit" className="bg-white text-black rounded-md p-2 m-4">Enviar</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginWindow;
