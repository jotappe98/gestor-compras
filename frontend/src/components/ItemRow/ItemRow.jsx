import { FaCheck } from "react-icons/fa";
import { FiEdit2, FiTrash2 } from "react-icons/fi";

import "../../styles/ItemRow.css";

function ItemRow({
            item,
            number,
            selected,
            onClick,
        }) { 

    return (

        <div
            className={`item-row ${selected ? "selected" : ""}`}
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
                    className={`status-badge ${item.status?.toLowerCase().replace(" ", "-")}`}
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

            <div className="column-actions">

                <button className="action-button complete-button">
                    <FaCheck />
                </button>

                <button className="action-button edit-button">
                    <FiEdit2 />
                </button>

                <button className="action-button trash-button">
                    <FiTrash2 />
                </button>

            </div>

        </div>

    );

}

export default ItemRow;