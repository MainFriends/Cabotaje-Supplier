import React from 'react'
import logo1 from '../../assets/img/portada.png'
import carne2 from '../../assets/img/carne2.png'
import lacteos from '../../assets/img/lacteos.png'
import cafe from '../../assets/img/cafe.png'

import contactanos from '../../assets/img/contactanos.png';
import horario from '../../assets/img/horario.png';
import servicio from '../../assets/img/domicilio.png';

import Card from '../../components/ChartJS/Card'
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
        <a href = "http://localhost:3000/profile#"  className='btn btn-danger btn-sm float-right my-3'><i className="fa-solid fa-thin fa-lock mr-2"></i>Cambiar Contraseña</a>
        </div>

        
      </div>
      <div className = 'row'>
        <div className = 'col-12'>
          <div className = 'card'>
            <img src = {logo1} ></img>
          </div>
        </div>
        <h4 className = 'py-3 px-3 font-weight-bold text-dark'>Atajos</h4>
      </div>

      

      
      <div className='row'>
        <div className='col-4'>
        <a href = "http://localhost:3000/profile#"  className='btn btn-danger btn-sm float-left my-3'><i className="fa-solid fa-solid fa-user mr-2"></i>Configurar perfil</a>

        </div>
        <div className='col-4'>
        <a href = "http://localhost:3000/dashboard/inventario"  className='btn btn-danger btn-sm float-left my-3'><i className="fa-solid fas fa-dolly-flatbed mr-2"></i>Inventario</a>

        </div>
        <div className='col-4'>
        <Link to = "/facturar"  className='btn btn-danger btn-sm float-left my-3'><i className="fa-solid fas fa-file-invoice mr-2"></i>Facturar</Link>

        </div>
      </div>

    </div>
  )
}

export default Welcome