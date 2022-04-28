const AlertError = ({message}) => {

    return (
        <div className="alert alert-danger text-center mx-0" role="alert">
            <strong>¡Error! </strong>{message}
        </div>
    )
}

export default AlertError;