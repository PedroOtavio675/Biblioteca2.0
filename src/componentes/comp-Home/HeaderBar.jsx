import { TextField } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
// import { useState } from "react";
const HeaderBar = (props) => {
  
  
  return (
    <div className="bg-slate-600 rounded-b-md w-[100%] fixed">
      <div className="w-[100vw] h-[40px] border-b flex items-center justify-center">
        <h1>Biblioteca</h1>
      </div>
      <div className="w-[100vw]  h-[80px] flex items-center justify-center ">
        <div className="absolute">
          <TextField 
          value={props.textoPesquisa}
          onChange={(e)=>{props.setTextoPesquisa(e.target.value)
            console.log(props.textoPesquisa);
          }}
          id="outlined-basic" label="Pesquisar" variant="outlined" />
        </div>

        <div className="bg-slate-400 absolute right-4 rounded-md p-2">
          <MenuIcon className="" onClick={props.showBar} />
        </div>
      </div>
    </div>
  );
};
export default HeaderBar;
