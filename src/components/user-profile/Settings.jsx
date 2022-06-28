import React from 'react'

const Settings = () => {
  return (
    <>
        <h1 className="text-dark">Configuraciones del sistema</h1>
        <hr />
        <form>
            <div className="row">
                <div className="col-6">
                    <div className="form-group">
                          <label className="form-label" htmlFor="ACCES_TIME">Tiempo de acceso al sistema<span className="text-danger"> *</span></label>
                          <select className="form-control" name="ACCESS_TIME" type="text" required>
                              <option value={''}>-Seleccionar-</option>
                              <option value="1">15 días</option>
                              <option value="2">20 días</option>
                              <option value="3">30 días</option>
                              <option value="4">90 días</option>
                              <option value="5">180 días</option>
                              <option value="6">365 días</option>
                          </select>
                          <small id="Help" className="form-text text-muted">Seleccione el tiempo de acceso que deseé asignar al usuario, recuerde la cantidad de tiempo podra ser actualizada.</small>
                    </div>
                </div>
            </div>
            <div className="row">
                <label for="exampleColorInput" class="form-label">Cambie el esquema de colores</label>
                <div className='col-lg-2 mt-4 '>
                  <div className='form-group'>
                  <input type="color" class="form-control form-control-color" id="exampleColorInput" value="#563d7c" title="Choose your color"></input>
                  </div>
                </div>
            </div>
        </form>
    </>
  )
}

export default Settings