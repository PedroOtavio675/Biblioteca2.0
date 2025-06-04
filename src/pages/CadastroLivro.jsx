import { Button, TextField } from "@mui/material"
import { useState } from "react"


 function CadastroLivro(){
    const [campoIsbn, setCampoIsbn] = useState("")

    const handleSubmit = async (e)=>{
        e.preventDefault()

        try{
            const resposta = await fetch('http://localhost:3000/InserirLivros', {
                method:"POST",
                headers:{
                    "Content-type":"application/json"
                },
                body: JSON.stringify({isbn: campoIsbn})
            })
           if(resposta.ok){
            alert("Livroinserido com sucesso!!")
            setCampoIsbn("")
           }else{
            const erro = await resposta.text()
            alert(erro)
           }
        }catch(err){
            console.log(err);  
        }
    }
   
    return(
        <div className="w-[100vw] h-[100vh] bg-slate-600 flex items-center justify-center rounded-md">
           
           <div className="bg-white text-[20px] flex items-center flex-col rounded-md w-[90%] h-[50%]">
            <h2>Cadastra Livros</h2>
           <form onSubmit={handleSubmit}>
               <TextField id="standard-basic" label="Digite a ISBN" variant="standard"
               value={campoIsbn}
               onChange={(e)=>setCampoIsbn(e.target.value)}/>
              <Button type="submit" variant="contained">Enviar</Button>
           </form>
            
           </div>
        </div>
    )

}

export default CadastroLivro