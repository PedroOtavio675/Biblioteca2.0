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
const BoxBook = (props) => {
    const [clickNoLivro, setClickNoLivro] = useState(null)
     const [dadosDOLivro, setDadosDOLivro] = useState({ descricao: "" });

  const googleBooks = async (isbn)=>{
    try{
const result = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`)
 const des = result.data.items[0].volumeInfo.description
 setDadosDOLivro("")
 setDadosDOLivro({descricao: des})
 console.log(dadosDOLivro);
 
    }catch(err){
       console.error(err);
    }
  }
  return (

      
    <div  className="flex flex-wrap justify-center flex-row items-start gap-4">
      {props.livros.map((e, index) => (
        <div key={index} onClick={()=>{
          setClickNoLivro(e)
          googleBooks(e.isbn)
        }}>
<Card   className='m-2' sx={{ maxWidth: 200, maxHeight: 340 }}>
      <CardMedia
        className='h-[250px] w-[150px] p-2'
        component="img"
        alt="img"
        height="140"
        image={`http://localhost:3000/${e.caminho_capa}`}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
         
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
