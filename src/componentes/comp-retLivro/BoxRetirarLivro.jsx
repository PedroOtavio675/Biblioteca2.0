

import { TextField } from "@mui/material";
import axios, { Axios } from "axios";
import { useState } from "react";
import validarCPF from "../../validarCPF";
import dataValida from "../../validarData";

const BoxRetirarLivro = ()=>{

  const [form, setForm] = useState({isbn:"", cpf:"", dataDevolucao:"", observacoes:""})
    
const retidaLivro = async (e)=>{
  e.preventDefault()
  const resultISBN = await axios.post("http://localhost:3000/verificarLivroExiste", form)
  const resultCPF = await axios.post("http://localhost:3000/verificarSeCPFJaExiste", form)
  
  if(form.isbn !== "" && form.cpf !== "" && form.dataDevolucao !== ""){
       if(resultISBN.data.length !== 0){
  if(validarCPF(form.cpf)){
    if(resultCPF.data.length !== 0){
if(dataValida(form.dataDevolucao)){
 alert("ok")
    }else{
      alert("Data inválida")
    }
    }else{
   alert("Pessoa não cadastrada!")
  }
  }else{
    alert("CPF inválido")
  }
 }else{
  alert("Livro não está cadastrado!")
 }
  }else{
    alert("Preencha todos os dados!")
  }
 
}

    return(
         <div className="w-[500px] h-[500px] bg-white rounded-md flex items-center justify-center flex-col">
<h2><strong>Retirar um Livro</strong></h2>
            <div className="flex flex-col">
          <TextField
            type="text"
            id="standard-basic-isbn"
            variant="standard"
            label="ISBN do livro"
            value={form.isbn}
            onChange={(e)=>{setForm({...form, isbn:e.target.value})}}
          ></TextField>
            <TextField
            type="text"
            id="standard-basic-cpf"
            variant="standard"
            label={validarCPF(form.cpf) ? "CPF" : "CPF inválido"}
             value={form.cpf}
            onChange={(e)=>{setForm({...form, cpf: e.target.value})}}
          ></TextField>
          <TextField
            type="text"
            id="standard-basic-dataDevolucao"
            variant="standard"
            label="Data de devolução"
            value={form.dataDevolucao}
            onChange={(e)=>{setForm({...form, dataDevolucao: e.target.value})}}
          ></TextField>
          </div>
           <textarea 
            value={form.observacoes}
            onChange={(e)=>{setForm({...form, observacoes: e.target.value})}}
           placeholder="Observações" name="" id="" className="w-[200px] h-[100px] border-1 rounded-md m-2"></textarea>
            <button onClick={retidaLivro} className="bg-slate-900 text-white rounded-md p-2 mt-4">Retirar</button>
        </div>
    )
}

export default BoxRetirarLivro