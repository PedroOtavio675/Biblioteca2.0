import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CardMedia from "@mui/material/CardMedia";
import Card from "@mui/material/Card";
const apiURl = import.meta.env.VITE_API_URL;
const DataLivro = ({ book, onClose, data }) => {
  if (!book) return null;


  function statusDoLivro(){
book.status == "pendente" && alert("O livro está emprestado")
  }

  return (
    <div className="w-[500px] h-[500px] border-1 bg-slate-200 rounded-md fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col">
      <ArrowBackIcon
        className="bg-slate-900 text-white rounded-md m-2"
        onClick={onClose}
      ></ArrowBackIcon>
      <div className="flex">
      <div>
        <Card className="m-2" sx={{ maxWidth: 200, maxHeight: 340 }}>
          <CardMedia
            className="h-[274px] bg-black w-[150px] p-2"
            component="img"
            alt="img"
            height="140"
            image={`${apiURl}/${book.caminho_capa}`}
          />
        </Card>
        </div>
      <div className="flex justify-center  flex-col h-[100%] w-[265px]">
        <h1>
          <strong>Título: </strong>{book.titulo_livro}
        </h1>
        <p><strong>Autor: </strong>{book.autor_livro}</p>
        <p><strong>Descrição:</strong></p>
        <p className="overflow-y-auto h-[210px]">{data.descricao}</p>
      </div>
      </div>
      <div className="flex">
 <button onClick={statusDoLivro} className={book.status == "livre" ? "w-[80px] h-[50px] bg-green-900 text-center flex items-center justify-center rounded-md m-2" : "w-[80px] h-[50px] bg-amber-400 text-center flex items-center justify-center rounded-md m-2"}>
         {book.status == "livre" ? "Não reservado" : "Pendente"}
      </button>
      <div className="m-2 bg-slate-500 rounded-md text-center">Retire o livro pelo ID:  <br /> {book.id}</div>
      </div>
    </div>
    
  );
};
export default DataLivro;
