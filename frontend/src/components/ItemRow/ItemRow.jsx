import { FaCheck } from "react-icons/fa";
import { FiEdit2, FiTrash2 } from "react-icons/fi";

import "../../styles/ItemRow.css";

function ItemRow({
    item,
    number,
    selected,
    highlighted,
    onClick,
    onComplete,
    onEdit,
    onTrash,
}) {
    return (
        <div
            data-item-id={item.id}
            className={[
                "item-row",
                selected ? "selected" : "",
                highlighted ? "item-row--highlighted" : "",
            ]
                .filter(Boolean)
                .join(" ")}
            onClick={onClick}
        >
            <div className="column-number">
                {number}
            </div>

            <div className="column-product">
                {item.produto}
            </div>

            <div className="column-status">
                <span
                    className={`status-badge ${
                        item.status
                            ?.toLowerCase()
                            .normalize("NFD")
                            .replace(/[\u0300-\u036f]/g, "")
                            .replace(/\s+/g, "-")
                    }`}
                >
                    {item.status}
                </span>
            </div>

            <div className="column-priority">
                <span
                    className={`priority-badge ${
                        item.prioridade
                            ?.toLowerCase()
                            .normalize("NFD")
                            .replace(/[\u0300-\u036f]/g, "")
                            .replace(/\s+/g, "-")
                    }`}
                >
                    {item.prioridade}
                </span>
            </div>

            <div className="column-supplier">
                {item.fornecedor || "-"}
            </div>

            <div className="column-requester">
                {item.solicitante || "-"}
            </div>

            <div
                className="column-actions"
                onClick={(event) => event.stopPropagation()}
            >
                <button
                    className="action-button complete-button"
                    title="Marcar pedido como realizado"
                    aria-label="Marcar pedido como realizado"
                    onClick={() => onComplete(item.id)}
                >
                    <FaCheck />
                </button>

                <button
                    className="action-button edit-button"
                    title="Editar item"
                    aria-label="Editar item"
                    onClick={() => onEdit(item.id)}
                >
                    <FiEdit2 />
                </button>

                <button
                    className="action-button trash-button"
                    title="Mover item para a lixeira"
                    aria-label="Mover item para a lixeira"
                    onClick={() => onTrash(item.id)}
                >
                    <FiTrash2 />
                </button>
            </div>
        </div>
    );
}

export default ItemRow;
