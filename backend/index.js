
const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const multer = require('multer')
const path = require('path')
const { Pool } = require("pg")
const PORT = 3000
const cors = require('cors')
const { Try } = require('@mui/icons-material')
const { log } = require('console')
app.use(cors())

app.use(express.json());

const pool = new Pool({
    user:'postgres',
    host:'localhost',
    database:'postgres',
    password:'admin',
    port:5432,
})

const storage = multer.diskStorage({
    destination: "uploads/",
    filename:(req,file,cb)=>{
        const uniqueName = Date.now() + "-" + file.originalname
        cb(null, uniqueName)
    }
})

const upload = multer({ storage })

app.post('/InserirLivros', upload.single("imagem"), async (req, res)=>{

   try{

    const { isbn, titulo, autor } = req.body
    const imagemUp = req.file ? "uploads/" + req.file.filename : null

    await  pool.query(`
        INSERT INTO livros (isbn, caminho_capa, titulo_livro, autor_livro)
        VALUES ($1, $2, $3, $4);
        `,[isbn, imagemUp, titulo, autor])

          res.status(201).send("Livro inserido com sucesso.");
   }catch(err){
        console.error("Erro ao inserir livro:", err);
    res.status(500).send("Erro ao inserir livro.");
    
   }
})

app.use("/uploads", express.static(path.join(__dirname, "uploads")))

app.get("/livrosDoBanco", async (req, res)=>{

    try{
        const result = await pool.query(`
            SELECT * FROM livros 
            `)
            res.json(result.rows)
    }catch(err){
        alert(err)
    }
})

app.post('/registrarUsuario', async (req, res)=>{
    const {nome, email, senha} = req.body
    
    const senhaHash = await bcrypt.hash(senha, 10)

    try{
        pool.query(`
            INSERT INTO usuarios (nome_usuario, email_usuario, senha_hash_usuario)
            VALUES($1, $2, $3)
            `,[nome,email,senhaHash])
            res.status(201).send("Usuario cadastrado")
    }catch(err){
        console.error(err)
         res.status(500).send('Erro ao cadastrar no banco')
    }
})

app.post('/verificarSeUsuarioJaExiste', async (req, res)=>{
    const {email} = req.body

    try{
const result = await pool.query(`
        SELECT 1 FROM usuarios
        WHERE email_usuario = $1
        LIMIT 1;
        `, [email])
    res.json(result.rows)
    }catch(err){
      console.log(err);
    }

})

app.listen(PORT,()=>{console.log("Funcionando");
})