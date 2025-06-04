import HeaderBar from "../componentes/comp-Home/HeaderBar";
import BoxHome from "../componentes/comp-Home/BoxHome";
import RigthBar from "../componentes/comp-Home/RigthBar";
import { useState } from "react";
const Home = () => {
  const [rightBar, setRightBar] = useState(false);

  function showBar() {
    setRightBar(true);
 
  }
  function hideBar() {
    setRightBar(false);
       console.log(rightBar);
  }

  return (
    <div>
      <HeaderBar rightBar={rightBar}  showBar={showBar}></HeaderBar>
      <BoxHome></BoxHome>
      <RigthBar rightBar={rightBar} hideBar={hideBar}></RigthBar>
    </div>
  );
};

export default Home;
