import "../../styles/ItemsTable.css"
import ItemRow from "../ItemRow/ItemRow"

function ItemsTable({ items }) {

    return (

        <table className="items-table">

            <thead>

                <tr >

                    <th>Nº</th>

                    <th>Produto</th>

                    <th>Status</th>

                    <th>Prioridade</th>

                    <th>Fornecedor</th>

                    <th>Solicitante</th>

                    <th>Ações</th>

                </tr>

            </thead>

            <tbody>

                    {

                        items.map((item, index) => (

                            <ItemRow

                                key={item.id}

                                item={item}

                                number={index + 1}

                            />

                        ))

                    }

                </tbody>

        </table>

    )

}

export default ItemsTable