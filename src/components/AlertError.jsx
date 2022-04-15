const AlertError = ({message}) => {

    return (
        <div className="alert alert-danger text-center mx-4" role="alert">
            <strong>¡Error! </strong>{message}
        </div>
    )
}

export default AlertError;