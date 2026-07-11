import "../../styles/ItemsTable.css";
import ItemRow from "../ItemRow/ItemRow";

function ItemsTable({
        items,
        selectedItemId,
        onSelectItem,
    }) {

    return (

        <div className="items-table">

            <div className="items-header">

                <div>Nº</div>

                <div>Produto</div>

                <div>Status</div>

                <div>Prioridade</div>

                <div>Fornecedor</div>

                <div>Solicitante</div>

                <div>Ações</div>

            </div>

            <div className="items-body">

                {

                    items.map((item, index) => (

                        <ItemRow
                            key={item.id}
                            item={item}
                            number={index + 1}
                            selected={selectedItemId === item.id}
                            onClick={() => onSelectItem(item.id)}
                        />

                    ))

                }

            </div>

        </div>

    );

}

export default ItemsTable;