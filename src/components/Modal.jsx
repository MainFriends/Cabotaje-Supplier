const Modal = ({id, title, content, disableButtonPost = false, setSubmitRequest}) => {

    return (
        <div className="modal fade text-dark" id={id} aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">{title}</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    {content}
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-primary" data-dismiss="modal">Cerrar</button>
                    {disableButtonPost
                    ? null
                    : <button type="button" onClick={setSubmitRequest(true)} className="btn btn-success">Guardar</button>}
                </div>
                </div>
            </div>
        </div>
    )
}

export default Modal;