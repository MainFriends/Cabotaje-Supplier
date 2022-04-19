import AlertError from './AlertError';

const Modal = ({idModal, title, content, messageError, modalSize = 'lg'}) => {

    return (
        <div className="modal fade text-dark" id={idModal} aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className={`modal-dialog modal-${modalSize}`}>
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">{title}</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    {content}
                    {messageError ? <AlertError message={messageError} /> : null}
                </div>
                </div>
            </div>
        </div>
    )
}

export default Modal;