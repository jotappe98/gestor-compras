import { FaCheck } from "react-icons/fa"
import { FiEdit2 } from "react-icons/fi"
import { FiTrash2 } from "react-icons/fi"
import "../../styles/ItemRow.css";

function ItemRow({ item,number }) {


    return (

        <tr>

            <td className="column-number">
                {number}
            </td>

            <td className="column-product">
                {item.produto}
            </td>

            <td className="column-status">

                <span
                    className={`status-badge ${item.status?.toLowerCase().replace(" ", "-")}`}
                >
                    {item.status}
                </span>

            </td>

            <td className="column-priority">
                {item.prioridade}
            </td>

            <td className="column-supplier">
                <span className={!item.fornecedor ? "empty-cell" : ""}>
                    {item.fornecedor || "-"}
                </span>
            </td>

            <td className="column-requester">
                <span className={!item.solicitante ? "empty-cell" : ""}>
                    {item.solicitante || "-"}
                </span>
            </td>

            <td className="column-actions">

                <div className="actions">

                    <button
                        className="action-button complete-button"
                    >
                        <FaCheck />
                    </button>

                    <button
                        className="action-button edit-button"
                    >
                        <FiEdit2 />
                    </button>

                    <button
                        className="action-button trash-button"
                    >
                        <FiTrash2 />
                    </button>

                </div>

            </td>

        </tr>

    )

}

export default ItemRow