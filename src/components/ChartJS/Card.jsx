import React from 'react'

const Card = ({titulo, component, className = ''}) => {
  return (
    <div className={`card shadow ${className}`}>
        <div className="card-header">
            {titulo}
        </div>
        <div className="card-body grafica">
            {component}
        </div>
    </div>
  )
}

export default Card