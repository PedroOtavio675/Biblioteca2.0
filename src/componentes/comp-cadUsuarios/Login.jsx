// import { useState } from "react";

const LoginWindow = (props) => {
 

  return (
    <div
      className={`bg-slate-800 text-white rounded-l-md transition-[width] duration-1000 ease-in-out flex items-center justify-center`}
      style={{ width: `${props.tamanhoTelas.telaLogin}px` }}
    >
        
      <div className="flex items-center justify-center flex-col">
        <h4 className="text-center">Já esta cadastrado?</h4>
        <button
          onClick={props.animacaoMenu}
          className={props.tamanhoTelas.telaLogin == 400 ? "hidden" : "bg-white text-black rounded-md p-2 m-4"}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginWindow;
