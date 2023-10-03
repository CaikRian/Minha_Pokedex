import "./style.css";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../Header/';

function CardPokemon() {
  // Estado para armazenar os dados dos Pokémon
  const [data, setData] = useState([]);
  // Estado para armazenar os dados originais (sem filtro)
  const [originalData, setOriginalData] = useState([]);
  // Estado para controlar o carregamento
  const [loading, setLoading] = useState(true);
  // Estado para o termo de pesquisa
  const [searchTerm, setSearchTerm] = useState('');

  // Função para buscar dados da API
  const fetchData = async () => {
    const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=10000');
    const cards = response.data.results;

    const cardDataPromises = cards.map(async (card) => {
      const response = await axios.get(card.url);
      return response.data;
    });

    // Usando Promise.all para buscar os dados de todos os Pokémon
    Promise.all(cardDataPromises)
      .then((cardData) => {
        setData(cardData);
        setOriginalData(cardData); // Armazena os dados originais
        setLoading(false);
      })
      .catch((error) => {
        console.error('Erro ao buscar dados:', error);
        setLoading(false);
      });
  };

  // Efeito de carregamento inicial
  useEffect(() => {
    fetchData();
  }, []);

  // Função para lidar com a pesquisa
  const handleSearch = (term) => {
    setSearchTerm(term);

    if (term === '') {
      // Restaurar dados originais quando o campo de pesquisa estiver vazio
      setData(originalData);
    } else {
      // Filtrar os dados com base no termo de pesquisa
      const filteredData = originalData.filter((item) =>
        item.name.toLowerCase().includes(term.toLowerCase())
      );
      setData(filteredData);
    }
  };

  return (
    <main>
      <Header onSearch={handleSearch} />
      {loading ? (
        <h1>Carregando pokemons...</h1>
      ) : (
        data.map((item, index) => (
          <div key={index} className="CardPokemon">
            <p>{item.types.map((type) => type.type.name).join(', ')}</p>
            <h2>{item.name}</h2>
            <img src={item.sprites.front_default} alt={item.name} />
          </div>
        ))
      )}
    </main>
  );
}

export default CardPokemon;
