import "./style.css"
import logo_pokemon from "./img/logo_pokemon.png"
function Header({ onSearch }){

    const handleSearch = (e) => {
        const searchTerm = e.target.value;
        onSearch(searchTerm); // Chama a função passada como prop onSearch com o valor da pesquisa
      };

    

    return(
        <header>
            <img src={logo_pokemon}/>
            <h1 id="titulo">Minha Pokédex</h1>
            <input 
                type="text" 
                placeholder="Pesquisar Pokémon..." 
                onChange={handleSearch} // Chama a função handleSearch quando o valor da pesquisa muda
            />
        </header>

    );
}

export default Header;