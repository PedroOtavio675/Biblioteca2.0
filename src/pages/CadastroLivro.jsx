import { Button, TextField } from "@mui/material";
import { useState } from "react";
import InputImg from "../componentes/comp-cadLivro/InputImg";

function CadastroLivro() {
  const [campoIsbn, setCampoIsbn] = useState("");
  const [imagem, setImagem] = useState(null);
 
  const handleSubmit = async (e) => {
     e.preventDefault();
    if (campoIsbn.trim() && imagem !== null) {
      const formData = new FormData();
      formData.append("isbn", campoIsbn);
      formData.append("imagem", imagem);
      try {
        const resposta = await fetch("http://localhost:3000/InserirLivros", {
          method: "POST",
          body: formData,
        });

        if (resposta.ok) {
          alert("Livro inserido com sucesso!!");
          setCampoIsbn("");
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
    <div className="w-[100vw] h-[100vh] bg-slate-600 flex items-center justify-center rounded-md">
      <div className="bg-white text-[20px] flex items-center  flex-col rounded-md p-1">
        <h2 className="p-2 ">Cadastra Livros</h2>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <div className="m-1">
            <TextField
              className=""
              id="standard-basic"
              label="Digite a ISBN"
              variant="standard"
              value={campoIsbn}
              onChange={(e) => setCampoIsbn(e.target.value.trim())}
            />
          </div>

          <InputImg imagem={imagem} setImagem={setImagem}></InputImg>
          <div className="flex flex-col justify-end m-10">
            <Button type="submit" variant="contained">
              Enviar
            </Button>
          </div>
        </form>
        <div></div>
      </div>
    </div>
  );
}

export default CadastroLivro;
