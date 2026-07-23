import "../../styles/ItemsTable.css";
import ItemRow from "../ItemRow/ItemRow";

function ItemsTable({
        items,
        page,
        limit,
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

                {items.length === 0 ? (

                    <div className="no-items-message">
                        Nenhum item encontrado...
                    </div>

                ) : (

                    items.map((item, index) => (

                        <ItemRow
                            key={item.id}
                            item={item}
                            number={((page - 1) * limit) + index + 1}
                            selected={selectedItemId === item.id}
                            onClick={() => onSelectItem(item.id)}
                        />

                    ))

                )}

            </div>

        </div>

    );

}

export default ItemsTable;