import "../../styles/TrashConfirmModal.css";
import { FiTrash2 } from "react-icons/fi";

function TrashConfirmModal({
    item,
    isSubmitting,
    onCancel,
    onConfirm,
}) {
    if (!item) {
        return null;
    }

    return (
        <div
            className="trash-confirm-overlay"
            onClick={onCancel}
        >
            <div
                className="trash-confirm-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="trash-confirm-title"
                onClick={(event) => event.stopPropagation()}
            >
                <div className="trash-confirm-title">
                    <FiTrash2 className="trash-confirm-title-icon" />

                    <h2 id="trash-confirm-title">
                        Mover para a lixeira?
                    </h2>
                </div>

                <p className="trash-confirm-message">
                    Deseja mover o item{" "}
                    <strong>"{item.produto}"</strong>{" "}
                    para a lixeira?
                </p>

                <p className="trash-confirm-description">
                    O item deixará de aparecer na lista
                    de pedidos pendentes.
                </p>

                <div className="trash-confirm-actions">
                    <button
                        type="button"
                        className="trash-cancel-button"
                        onClick={onCancel}
                        disabled={isSubmitting}
                    >
                        Cancelar
                    </button>

                    <button
                        type="button"
                        className="trash-confirm-button"
                        onClick={onConfirm}
                        disabled={isSubmitting}
                    >
                        {isSubmitting
                            ? "Movendo..."
                            : "Mover para lixeira"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default TrashConfirmModal;