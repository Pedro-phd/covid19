import React,{useState, useEffect} from 'react'
const axios = require('axios')

const useCovid = (option,slug) => {

    useEffect(()=>{
        axios.get('https://covid19-brazil-api.now.sh/api/report/v1')
        .then(response => {setStates(response.data)})
    },[])

    const [localData, setLocalData] = useState([{Country:"", Confirmed:0, Deaths:0}])
    const [randomData, setRandomData] = useState([{state:"", cases:0, deaths:0}])
    const [states, setStates] = useState([{uf:""}])
    const inf = localData[localData.length - 1]


    if(option === "random"){
        random("sp")
        const number = randomNumber();
        const inf = states[number]
        return(
            <>
                <button onClick={()=>{console.log(inf)}}>checar</button>
                <p>Estado: {randomData.state}</p>
                <p>Confirmados: {randomData.cases}</p>
                <p>Mortes: {randomData.deaths}</p>
            </>
        )
    }else if(option === "local" && slug !== ""){

       local(slug)

        return (
            <>
                <p>País: {inf.Country}</p>
                <p>Confirmados: {inf.Confirmed}</p>
                <p>Mortes: {inf.Deaths}</p>
            </>
        ) 
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

    function random(uf){
        axios.get(`https://covid19-brazil-api.now.sh/api/report/v1/brazil/uf/${uf}`)
        .then(response => {setRandomData(response.data)})
    }
    function randomNumber(){
        return Math.floor(Math.random() * (27 - 1)) + 1;
    }




}

export default useCovid;