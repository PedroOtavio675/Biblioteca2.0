import { Children } from "react"
import BoxBook from "./BoxBook"

const BoxHome = (props)=>{

    return(
        <div className="bg-slate-400 w-[100vw] rounded-md flex justify-center items-center">
           <BoxBook showHide={props.showHide} setShowHide={props.setShowHide} showDadosLivro={props.showDadosLivro}  hideDadosLivro={props.hideDadosLivro} livros={props.livros}></BoxBook>
        </div>
    )
}
export default BoxHome