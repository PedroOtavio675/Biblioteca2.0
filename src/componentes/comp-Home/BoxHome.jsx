import { Children } from "react"
import BoxBook from "./boxBook"

const BoxHome = (props)=>{

    return(
        <div className="bg-slate-400 w-[100vw] rounded-md flex justify-center items-center">
           <BoxBook livros={props.livros}></BoxBook>
        </div>
    )
}
export default BoxHome