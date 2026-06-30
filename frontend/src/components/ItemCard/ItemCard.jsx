function ItemCard({

    item

}) {

    return (

        <div
            className="item-card"
        >

            <h3>

                {
                    item.produto
                }

            </h3>

            <p>

                Quantidade:

                {
                    item.quantidade
                }

            </p>

        </div>

    )

}


export default (
    ItemCard
)