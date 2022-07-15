import React from 'react'
import logo1 from '../../assets/img/portada.png'
import { Link } from 'react-router-dom'



const Welcome = () => {
  const nombre = JSON.parse(localStorage.getItem("userSession"));
  const nombreWelcome = `${nombre.FIRST_NAME} ${nombre.LAST_NAME}`;
  return (    
    <div>
      <div className = "row">
        <div className = 'col-10'>
        <h1 className = 'py-2 px-1 font-weight-bold text-dark'>¡Bienvenido {nombreWelcome}!</h1>
        </div>
        <div className="col-2">
          <Link to = "/profile"  className='btn btn-danger btn-sm float-right my-3'><i className="fa-solid fa-thin fa-lock mr-2"></i>Cambiar Contraseña</Link>
        </div>

        
      </div>
      <div className = 'row'>
        <div className = 'col-12'>
          <div className = 'card'>
            <img src = {logo1} ></img>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Welcome