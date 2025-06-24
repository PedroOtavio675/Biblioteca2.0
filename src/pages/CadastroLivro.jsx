import { Button, TextField } from "@mui/material";
import { useState } from "react";
import InputImg from "../componentes/comp-cadLivro/InputImg";
const apiURL = import.meta.env.VITE_API_URL;
function CadastroLivro() {
  const [campoIsbn, setCampoIsbn] = useState("");
  const [imagem, setImagem] = useState(null);
  const [titulo, settitulo] = useState("")
 const [autor, setautor] = useState("")
 const [genero, setGenero] = useState("")

  const handleSubmit = async (e) => {
    console.log(apiURL);
    
     e.preventDefault();
    if (campoIsbn.trim() && imagem !== null && titulo !== "" && autor !== "" && genero !== "") {
      const formData = new FormData();
      formData.append("isbn", campoIsbn);
      formData.append("imagem", imagem);
      formData.append("titulo", titulo)
      formData.append("autor", autor)
      formData.append("genero", genero)
      try {
        const resposta = await fetch(`${apiURL}/InserirLivros`, {
          method: "POST",
          body: formData,
        });

        if (resposta.ok) {
         const result = await resposta.json()
         alert(`${result.mensagem} \n O id do livro é ${result.idCadastrado}`)
          setCampoIsbn("");
          settitulo("")
          setautor("")
          setImagem(null)
        } else {
          const erro = await resposta.text();
          alert(erro);
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      alert("Complete todos os campos");
    }
  };

  return (
    <div className="w-[100vw] h-screen overflow-x-hidden bg-slate-900 flex items-center justify-center rounded-md">
      <div className="bg-white text-sm sm:text-base flex items-center justify-center w-[90%] md:w-[75%] lg:w-[50%]  flex-col rounded-md p-1">
        <h2 className="p-2 ">Cadastrar Livro</h2>
        <form className="flex flex-col items-center gap-y-4 w-full sm:w-[300px] md:w-[400px]" onSubmit={handleSubmit}>
           <div className="rounded-md m-2 flex-wrap">
        
            <TextField
              className="w-full sm:w-[300px] md:w-[400px]"
              id="standard-basic"
              label="Digite a ISBN"
              variant="standard"
              value={campoIsbn}
              onChange={(e) => setCampoIsbn(e.target.value.trim())}
            />
            <TextField
             className="w-full sm:w-[300px] md:w-[400px]"
              id="standard-basic"
              label="Nome do livro"
              variant="standard"
              value={titulo}
              onChange={(e)=> settitulo(e.target.value)}
            >
            </TextField>
            
             <TextField
             className="w-full sm:w-[300px] md:w-[400px]"
              id="standard-basic"
              label="Gênero"
              variant="standard"
              value={genero}
              onChange={(e)=> setGenero(e.target.value)}
            ></TextField>

            
             <TextField
             className="w-full sm:w-[300px] md:w-[400px]"
              id="standard-basic"
              label="Nome do autor"
              variant="standard"
              value={autor}
              onChange={(e)=> setautor(e.target.value)}
            >
            

            </TextField>
          </div>

          <InputImg imagem={imagem} setImagem={setImagem}></InputImg>
          <div className="flex flex-col">
            <Button type="submit" className="w-[200px]" variant="contained">
              Enviar
            </Button>
          </div>
        </form>
      
      </div>
    </div>
  );
}

export default CadastroLivro;
