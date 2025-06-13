

import { TextField } from "@mui/material";


const BoxRetirarLivro = ()=>{
    

    return(
         <div className="w-[500px] h-[500px] bg-white rounded-md flex items-center justify-center flex-col">
<h2>Retirar um Livro</h2>
            <div className="flex flex-col">
          <TextField
            type="text"
            id="standard-basic-isbn"
            variant="standard"
            label="ISBN"
          ></TextField>
            <TextField
            type="text"
            id="standard-basic-cpf"
            variant="standard"
            label="CPF"
          ></TextField>
          
          </div>
          <input type="text" placeholder="Observações" className="border-2 flex-wrap rounded-md w-[300px] h-[170px]"/>
            <button className="bg-slate-900 text-white rounded-md p-2 mt-4">Retirar</button>
        </div>
    )
}

export default BoxRetirarLivro