import React,{useEffect, useState, useMemo} from 'react';

import Infos from './Infos'

import dataContext from '../dataContext'

import './style.css'
const axios = require('axios')


function Country({slug}) {

    useEffect(() => {},[])

    const [data, setData] = useState([{Confirmed:0, Deaths:0}])
    const [hidden, setHidden] = useState(true)
    const inf = data[data.length - 1]
    
    const fnc = useMemo(() => async function search(slug) {
      axios.get(`https://api.covid19api.com/country/${slug}`)
      .then(response => {
         if(response.data.length !== 0 ){
          setData(response.data)
        }else{
           alert("indisponivel")

        }
      })
      .then(setHidden(false))
      .catch(console.log(""))
  }, []);

    return (
      <div>
        <dataContext.Provider value={inf}>
          <h1>Informações </h1>
          <button onClick={()=>{
              fnc(slug)
          }}>Atualizar informações</button>
          <Infos hidden={hidden}/>
        </dataContext.Provider>

      </div>
  );
}

export default Country;