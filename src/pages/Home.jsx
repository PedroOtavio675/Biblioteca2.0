import HeaderBar from "../componentes/comp-Home/HeaderBar";
import BoxHome from "../componentes/comp-Home/BoxHome";
import RigthBar from "../componentes/comp-Home/RigthBar";
import { useEffect, useState } from "react";
import DataLivro from "../componentes/comp-Home/DataLivro";
const apiURl = import.meta.env.VITE_API_URL;
const Home = () => {
  const [livros, setLivros] = useState([]);
  const [rightBar, setRightBar] = useState(false);
  const [generoSelecionado, setGeneroSelecionado] = useState("")
  const [textoPesquisa, setTextoPesquisa] = useState("")
  const [livrosFiltrados, setLivrosFiltrados] = useState([])

  function showBar() {
    setRightBar(true);
  }
  function hideBar() {
    setRightBar(false);
    console.log(rightBar);
  }

  useEffect(() => {
    fetch(`${apiURl}/livrosDoBanco`)
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao Buscar!");
        return res.json();
      })
      .then((data) => {
        
        setLivros(data)
        setLivrosFiltrados(data)

      })

      .catch((err) => console.log(err));
  }, []);

 useEffect(()=>{
  
  setLivrosFiltrados(livros.filter((e)=> {
    if(e.titulo_livro.toLowerCase().startsWith(textoPesquisa.toLowerCase())){
      return true
    }
    if(e.autor_livro.toLowerCase().startsWith(textoPesquisa.toLowerCase())){
      return true
    }
    return false
  } ))
 },[textoPesquisa])
 
   
  return (
    <div >
      <div className="flex items-center flex-col">
      <HeaderBar livrosFiltrados={livrosFiltrados} livros={livros} setLivrosFiltrados={setLivrosFiltrados} textoPesquisa={textoPesquisa} setTextoPesquisa={setTextoPesquisa} rightBar={rightBar} showBar={showBar}></HeaderBar>
      <BoxHome livros={livrosFiltrados}></BoxHome>
      </div>
      <DataLivro></DataLivro>
      <RigthBar generoSelecionado={generoSelecionado} setGeneroSelecionado={setGeneroSelecionado} rightBar={rightBar} hideBar={hideBar}></RigthBar>
    </div>
  );
};

export default Home;
