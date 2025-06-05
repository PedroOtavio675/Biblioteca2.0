


const InputImg =(props)=>{

    return(
        <div>
            <label className="block w-full max-w-md p-6 border-2 border-dashed border-gray-400 rounded-2xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition">
  <div className="flex flex-col items-center justify-center space-y-2">
    
    <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15a4 4 0 004 4h10a4 4 0 004-4v-3a4 4 0 00-4-4h-3l-1-2h-2l-1 2H7a4 4 0 00-4 4v3z" />
    </svg>
    <p className="text-gray-600 font-medium">Clique ou arraste um arquivo aqui</p>
    <p className="text-sm text-gray-400">.jpg, .png, .pdf até 10MB</p>
  </div>
  <div className="flex items-center justify-center">
  <input
              
              className="hidden"
                
               type="file" 
               accept="image/*"
               onChange={(e)=> props.setImagem(e.target.files[0])}

               />
             
  {
  props.imagem && <img className="w-[200px] m-1 border rounded-md h-[300px]" src={URL.createObjectURL(props.imagem)} alt="" /> 
}
   </div>
</label>

        </div>
    )
}
export default InputImg