
const express = require('express')
const app = express()
const multer = require('multer')
const path = require('path')
const { Pool } = require("pg")
const PORT = 3000
const cors = require('cors')
app.use(cors())

app.use(express.json());

const pool = new Pool({
    user:'postgres',
    host:'localhost',
    database:'postgres',
    password:'admin',
    port:5432,
})


app.post('/InserirLivros', async (req, res)=>{
    const { isbn } = req.body
   try{
    const result = await  pool.query(`
        INSERT INTO livros (isbn)
        VALUES ($1);
        `,[isbn])
          res.status(201).send("Livro inserido com sucesso.");
   }catch(err){
        console.error("Erro ao inserir livro:", err);
    res.status(500).send("Erro ao inserir livro.");
   }
})

app.listen(PORT,()=>{console.log("Funcionando");
})