import "../../styles/ItemCard.css"

function ItemCard({

    item

}) {

    return (

        <div
            className="item-row"
        >

            <div
                className="item-number"
            >

                {
                    item.id
                }

            </div>

            <div
                className="item-product"
            >

                {
                    item.produto
                }

            </div>

            <div
                className="item-quantity"
            >

                {
                    item.quantidade
                }

            </div>

            <div
                className="item-category"
            >

                {
                    item.categoria_id
                }

            </div>

            <div
                className="item-priority"
            >

                {
                    item.prioridade_id
                }

            </div>

            <div
                className="item-actions"
            >

                ☐

                🗑

                ✎

            </div>

        </div>

    )

}

export default (
    ItemCard
)