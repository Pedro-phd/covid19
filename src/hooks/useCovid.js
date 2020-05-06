import React,{useState} from 'react'
const axios = require('axios')

const useCovid = (option,slug) => {

    const [localData, setLocalData] = useState([{Country:"", Confirmed:0, Deaths:0}])
    const inf = localData[localData.length - 1]


    if(option === "random"){
        return(
            <p>Random</p>
        )
    }else if(option === "local" && slug !== ""){
        local(slug)
        alert(`Pais: ${localData.Country} Confirmados: ${localData.Confirmed} Mortes: ${localData.Deaths}`)
        return <button onClick={()=> {
            alert(`Pais: ${localData.Country} Confirmados: ${localData.Confirmed} Mortes: ${localData.Deaths}`)
         }}> Comparar </button> 
    } else if(option === "local" && slug === ""){
        return(
            <p>Slug undefined</p>
        )
    } else{
        return(
            <p>Option invalid</p>
        )
    }

    function local(slug){

        axios.get(`https://api.covid19api.com/country/${slug}`)
        .then(response => {
         if(response.data.length !== 0 ){
            setLocalData(response.data)
        }else{
           return(
               <p>Dado inacessível</p>
           )
        }
      })
    }



}

export default useCovid;