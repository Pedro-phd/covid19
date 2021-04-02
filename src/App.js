import React, {useState, useEffect} from 'react';

import './App.css';

import Country from './components/Country'

import useGlobalDatas from './hooks/useGlobalDatas'
import useCovid from './hooks/useCovid'
const axios = require('axios')

function App() {

//REALIZAR A BUSCA INICIAL PARA PREENCHER O SELECT

  useEffect(()=>{
    axios.get('https://api.covid19api.com/countries')
    .then(response => {setContries(response.data)})
  },[])

  //INFORMAÇÕES PARA BUSCA E DADOS DO SELECT
  
  const [countries, setContries] = useState([])
  const [slug, setSlug] = useState("afghanistan")

  //HOOKS PERSONALIZADOS

  // RETORNAR DADOS GLOBAIS
  const globalData = useGlobalDatas();
  //RETORNAR PEQUENOS DADOS LOCAIS
  const covidDataLocal = useCovid("local","brazil");
  //RETORNAR DADOS DE PAISES ALEATORIOS
  const covidDataRandom = useCovid("random");

  return (
    <div className="App">

      <header> 
        <h1>COVID-19</h1>
      </header>

      <div className="select">
        <h1>Selecione o país:</h1>
        <select 
        onChange={e => setSlug(e.target.value)}>

          {countries.map(i =>{
            return(
              <option value={i.Slug} key={i.Slug}> {i.Country} </option>
            )
          
          })}
        </select>
      </div>

      <div className="infos">
       <Country slug={slug}/>
      </div>
      
      <div className="mini-infos">
        <p>DADOS GLOBAIS: 
          {globalData}
        </p>
        <p>Comparação: 
          {covidDataLocal}
        </p>
        <p>Alguns estados brasileiros: 
          {covidDataRandom}
        </p>
      </div>


    </div>
  );
}

export default App;
