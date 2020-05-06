import React from 'react';
import './style.css'


import dataContext from '../dataContext'
function Infos({hidden}) {
  return (
      <div>
          <dataContext.Consumer>
            {inf =>(
              
                <div hidden={hidden}>
                <h1>Casos confirmados: </h1>
                {inf.Confirmed}
                <h1>Mortes confirmados: </h1>
                {inf.Deaths}
                </div>
            )
            }
          </dataContext.Consumer>
      </div>
  )
}

export default Infos;