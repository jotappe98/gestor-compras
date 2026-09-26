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
                        item.status?.toLowerCase().replace(" ", "-")
                    }`}
                >
                    {item.status}
                </span>
            </div>

            <div className="column-priority">
                {item.prioridade}
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
                    onClick={() => onComplete(item.id)}
                >
                    <FaCheck />
                </button>

                <button
                    className="action-button edit-button"
                    onClick={() => onEdit(item.id)}
                >
                    <FiEdit2 />
                </button>

                <button
                    className="action-button trash-button"
                    onClick={() => onTrash(item.id)}
                >
                    <FiTrash2 />
                </button>
            </div>
        </div>
    );
}

export default ItemRow;
