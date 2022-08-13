import React from 'react'
import axios from '../../config/axios';
import token from '../../helpers/getToken';

const BackupAndRestore = () => {

  const createBackup = () => {
    axios.get('/backup', token());
  }

  const runRestore = () => {
    axios.get('/restore', token());
  }

  return (
    <>
        <h1 className="text-dark">Copias de seguridad y restauración</h1>
        <hr />
        <button onClick={() => createBackup()} className="btn btn-primary">Realizar backup</button>
    </>
  )
}

export default BackupAndRestore