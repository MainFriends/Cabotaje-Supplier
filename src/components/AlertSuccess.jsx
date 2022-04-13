const AlertSuccess = ({message}) => {

    return (
        <div className="alert alert-success text-center mx-4" role="alert">
            <strong>¡Bien hecho! </strong>{message}
        </div>
    )
}

export default AlertSuccess;