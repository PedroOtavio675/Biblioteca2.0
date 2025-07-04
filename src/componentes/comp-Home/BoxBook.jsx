import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import DataLivro from './DataLivro';
import axios from "axios";
// const apiURl = import.meta.env.VITE_API_URL;
const BoxBook = (props) => {
    const [clickNoLivro, setClickNoLivro] = useState(null)
     const [dadosDOLivro, setDadosDOLivro] = useState({ descricao: "" });
let result
  const googleBooks = async (isbn, titulo)=>{
    setDadosDOLivro("")
    try{
result = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`)
console.log(result.data.totalItems);


if(result.data.totalItems == 0){
  result = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=title:${titulo}`)
}


 const des = result.data.items[0].volumeInfo.description
 setDadosDOLivro({descricao: des})

 
    }catch(err){
       console.error(err);
    }
  }
  return (

      
    <div  className="flex flex-wrap justify-center flex-row pt-[150px] items-start gap-4">
      {props.livros.map((e, index) => (
        <div key={index} onClick={()=>{
          setClickNoLivro(e)
          googleBooks(e.isbn, e.titulo_livro)
          console.log(e.genero_livro);
          
        }}>
<Card   className='m-1' sx={{ maxWidth: 150, maxHeight: 340 }}>
      <CardMedia
        className='h-[258px] p-[3px]'
        component="img"
        alt="img"
        image={e.caminho_capa}
      />
      <CardContent className='p-0' sx={{padding: 1}}>
        <Typography  gutterBottom variant="h10" component="div">
      
       {e.titulo_livro}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {e.autor_livro}
        </Typography>
      </CardContent>
      <CardActions>
      </CardActions>
    </Card>
    </div>
   
      ))}
       {clickNoLivro && (
      <DataLivro data={dadosDOLivro} book={clickNoLivro} onClose={()=> setClickNoLivro(null)}></DataLivro>
    )}
    </div>
  );
};
export default BoxBook;
