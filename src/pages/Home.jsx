import HeaderBar from "../componentes/comp-Home/HeaderBar";
import BoxHome from "../componentes/comp-Home/BoxHome";
import RigthBar from "../componentes/comp-Home/RigthBar";
import { useEffect, useState } from "react";
const Home = () => {
  const [livros, setLivros] = useState([""])
  const [rightBar, setRightBar] = useState(false);

  function showBar() {
    setRightBar(true);
 
  }
  function hideBar() {
    setRightBar(false);
       console.log(rightBar);
  }

  useEffect(()=>{
    fetch("http://localhost:3000/livrosDoBanco")
    .then((res) =>{
      if(!res.ok) throw new Error("Erro ao Buscar!")
        return res.json()
    })
    .then((data)=>setLivros(data))
    
    .catch((err)=>console.log(err)
    )
  },[])

  return (
    <div>
      <HeaderBar rightBar={rightBar}  showBar={showBar}></HeaderBar>
      <BoxHome livros={livros}>
  
      </BoxHome>
    
      <RigthBar rightBar={rightBar} hideBar={hideBar}></RigthBar>

    </div>
  );
};

export default Home;
