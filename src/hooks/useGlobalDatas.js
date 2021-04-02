import React,{useState, useEffect} from 'react'
const axios = require('axios')
const useGlobalData = () => {
    const [data, setData] = useState([])
    useEffect(()=>{
        axios.get('https://api.covid19api.com/world/total')
        .then(response => setData(response.data))
    },[])
return (<p>Confimados: {data.TotalConfirmed} Mortes: {data.TotalDeaths}</p>);
}

export default useGlobalData;