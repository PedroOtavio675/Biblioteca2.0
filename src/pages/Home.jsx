import HeaderBar from "../componentes/comp-Home/HeaderBar";
import BoxHome from "../componentes/comp-Home/BoxHome";
import RigthBar from "../componentes/comp-Home/RigthBar";
import { useEffect, useState } from "react";
import DataLivro from "../componentes/comp-Home/DataLivro";
const apiURl = import.meta.env.VITE_API_URL;
const Home = () => {
  const [livros, setLivros] = useState([""]);
  const [rightBar, setRightBar] = useState(false);

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
      .then((data) => setLivros(data))

      .catch((err) => console.log(err));
  }, []);

  return (
    <div >
      <div className="flex items-center flex-col">
      <HeaderBar rightBar={rightBar} showBar={showBar}></HeaderBar>
      <BoxHome livros={livros}></BoxHome>
      </div>
      <DataLivro></DataLivro>
      <RigthBar rightBar={rightBar} hideBar={hideBar}></RigthBar>
    </div>
  );
};

export default Home;
