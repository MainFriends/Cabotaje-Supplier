import React, { useState } from 'react'
import axios from '../../../config/axios';
import token from '../../../helpers/getToken';
import AlertSuccess from '../../../components/AlertSuccess';
import AlertError from '../../../components/AlertError';

const BackupAndRestore = () => {

  const createBackup = () => {
    axios.get('/backup', token())
    .then(res => {
      setAlertMessage({
        message: 'Copia de seguridad realizada con éxito.',
        ok: true
      });

      setTimeout(() => {
        setAlertMessage({
          message: '',
          ok: ''
        });
      }, 3000);
    })
  }

  const runRestore = () => {
    axios.get('/restore', token());
  }

  const [alertMessage, setAlertMessage] = useState({
    message: '',
    ok: ''
});

  return (
    <div className='p-4'>
        <h1 className="text-dark">Copias de seguridad y restauración</h1>
        <hr />
        <button onClick={() => createBackup()} className="btn btn-primary">Realizar copia de seguridad</button>
        <div className="row mt-4">
            <div className="col-12">
              {alertMessage.ok ? <AlertSuccess message={alertMessage.message}/> : null}
              {alertMessage.ok === false ? <AlertError message={alertMessage.message}/> : null}
            </div>
        </div>
        {/* <hr />
        <button onClick={() => runRestore()} className="btn btn-primary">Realizar Restore</button>
        <div className="row">
                <div className="col-12">
                {alertMessage.ok ? <AlertSuccess message={alertMessage.message}/> : null}
                {alertMessage.ok === false ? <AlertError message={alertMessage.message}/> : null}
                </div>
        </div> */}
    </div>
  )
}

export default BackupAndRestore