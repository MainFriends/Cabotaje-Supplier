const AlertWarning = ({message}) => {

    return (
        <div className="alert alert-warning text-center mx-4" role="alert">
            <strong>Advertencia </strong>{message}
        </div>
    )
}

export default AlertWarning;