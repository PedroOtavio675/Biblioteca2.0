

import { TextField } from "@mui/material";
import axios, { Axios } from "axios";
import { useState } from "react";
import validarCPF from "../../validarCPF";
import dataValida from "../../validarData";
const apiURl = import.meta.env.VITE_API_URL;
const BoxRetirarLivro = ()=>{

  const [form, setForm] = useState({id:"", cpf:"", dataDevolucao:"", observacoes:""})
  function parseDataBR(dataStr) {
  const [dia, mes, ano] = dataStr.split("/").map(Number);
  return new Date(ano, mes - 1, dia); // mês começa em 0 (janeiro)
}
    
const retidaLivro = async (e)=>{
  e.preventDefault()
  
  if(form.id !== "" && form.cpf !== "" && form.dataDevolucao !== ""){
    const resultID = await axios.post(`${apiURl}/verificarLivroExiste`, form)
  const resultCPF = await axios.post(`${apiURl}/verificarSeCPFJaExiste`, form)
       if(resultID.data.length !== 0){
  if(validarCPF(form.cpf)){
    if(resultCPF.data.length !== 0){
if(dataValida(form.dataDevolucao)){
  const dataHoje = new Date()
  const dataVerificada = parseDataBR(form.dataDevolucao)
  if(dataVerificada > dataHoje){
 const resultado = await axios.post(`${apiURl}/fazerRetirada`, form)
 const result = await resultado.data
 alert(result.mensagem)
  }else{
    alert("A data de devolução deve ser maior que a data atual!")
  }
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
         <div className="w-[95%] sm:w-[300px] md:w-[400px] bg-white rounded-md flex items-center justify-center flex-col">
<h2><strong>Retirar um Livro</strong></h2>
            <div className="flex flex-col">
          <TextField
            type="text"
            id="standard-basic-isbn"
            variant="standard"
            label="ID do livro"
            value={form.id}
            onChange={(e)=>{setForm({...form, id:e.target.value})}}
          ></TextField>
            <TextField
            type="text"
            id="standard-basic-cpf"
            variant="standard"
            label={validarCPF(form.cpf) || form.cpf == "" ? "CPF do retirante" : "CPF inválido"}
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
            <button onClick={retidaLivro} className="bg-slate-900 text-white rounded-md p-2 m-4">Retirar</button>
        </div>
    )
}

export default BoxRetirarLivro