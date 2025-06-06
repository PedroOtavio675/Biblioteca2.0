import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const BoxBook = (props) => {
  return (

    
    <div className="flex flex-wrap items-center justify-center">
      {props.livros.map((e, index) => (
<Card key={index} className='m-2' sx={{ maxWidth: 200, maxHeight: 340 }}>
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
      ))}
    </div>
  );
};
export default BoxBook;
