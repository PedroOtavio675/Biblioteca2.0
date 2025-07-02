import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const RightBar = (props) => {
  let usuario;
  if (localStorage.getItem("login") !== undefined) {
    usuario = JSON.parse(localStorage.getItem("login"));
  }

  return (
    <div
      className={
        props.rightBar
          ? "bg-slate-950 fixed rounded-l-md right-0 top-0 h-[100vh] w-[250px] z-50"
          : "hidden"
      }
    >
      <ArrowBackIcon
        onClick={props.hideBar}
        className="bg-white rounded-md m-2 cursor-pointer hover:bg-slate-200"
      />

      <ul className="text-black   w-[100%] flex items-center justify-center flex-col space-y-2">
        <li className="bg-slate-600 rounded-[3px] w-full text-white ">
          Categoria:
          <select
            value={props.generoSelecionado}
            onChange={(e) => {
              props.setGeneroSelecionado(e.target.value);
              console.log(props.generoSelecionado);
            }}
            className=""
            name=""
            id=""
          >
            <option value="">todos</option>
            <option value="Romance">Romance</option>
            <option value="Ficção Científica">Ficção Científica</option>
            <option value="Fantasia">Fantasia</option>
            <option value="Mistério">Mistério</option>
            <option value="Suspense">Suspense</option>
            <option value="Terror">Terror</option>
            <option value="Aventura">Aventura</option>
            <option value="Drama">Drama</option>
            <option value="Biografia">Biografia</option>
            <option value="História">História</option>
            <option value="Autoajuda">Autoajuda</option>
            <option value="Clássico">Clássico</option>
            <option value="Poesia">Poesia</option>
            <option value="Humor">Humor</option>
            <option value="Infantil">Infantil</option>
          </select>
        </li>

        {usuario.tipo == "adm" && (
          <button className="bg-slate-600 rounded-[3px] w-full text-white text-center"><li>
            <a rel="stylesheet" href="/CadastroLivro">Cadatrar Livro</a>
          </li></button>
        )}
      </ul>
    </div>
  );
};
export default RightBar;
