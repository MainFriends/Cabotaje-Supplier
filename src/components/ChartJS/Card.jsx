import React from 'react'

const Card = ({titulo, component, image, className = ''}) => {
  return (
    <div className={`card shadow ${className}`}>
        <div className="card-header text-dark">
            {titulo}
        </div>
        <img src={image} alt="" />
        <div className="card-body grafica">
            {component}
        </div>
    </div>
  )
}

export default Card