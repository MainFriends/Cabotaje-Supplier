import React from 'react'

const Card = ({titulo, component, className = ''}) => {
  return (
    <div class={`card shadow ${className}`}>
        <div class="card-header">
            {titulo}
        </div>
        <div class="card-body grafica">
            {component}
        </div>
    </div>
  )
}

export default Card