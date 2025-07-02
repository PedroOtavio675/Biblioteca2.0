import { Children } from "react"
import BoxBook from "./BoxBook"

const BoxHome = (props)=>{

    return(
        <div className="bg-slate-400 w-[100vw] h-[100% ] rounded-md flex justify-center">
           <BoxBook showHide={props.showHide} setShowHide={props.setShowHide} showDadosLivro={props.showDadosLivro}  hideDadosLivro={props.hideDadosLivro} livros={props.livros}></BoxBook>
        </div>
    )
}
export default BoxHome