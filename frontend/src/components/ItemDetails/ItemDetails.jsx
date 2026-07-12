import "../../styles/ItemsDetails.css";


function ItemDetails({item}) {

    if (!item) {

        return (

            <section className="item-details">

                <h2 className="details-title">
                    Detalhes do Item
                </h2>

                <div className="details-empty">

                    <p>
                        Selecione um item da tabela para visualizar suas informações.
                    </p>

                </div>

            </section>

        );

    }

    return (

        <section className="item-details">

            <h2 className="details-title">
                DETALHES DO ITEM
            </h2>

            <div className="details-grid">

                <div className="detail-card reference">
                    <span className="detail-label">
                        Produto
                    </span>

                    <span className="detail-value">
                        {item ? item.produto : "-"}
                    </span>
                </div>

                <div className="detail-card">
                    <span className="detail-label">
                        Quantidade
                    </span>

                    <span className="detail-value">
                        {item ? item.quantidade : "-"}
                    </span>
                </div>

                <div className="detail-card">
                    <span className="detail-label">
                        Categoria
                    </span>

                    <span className="detail-value">
                        {item?.categoria || "-"}
                    </span>
                </div>

                <div className="detail-card">
                    <span className="detail-label">
                        Prioridade
                    </span>

                    <span className="detail-value">
                        {item?.prioridade || "-"}
                    </span>
                </div>

                <div className="detail-card">
                    <span className="detail-label">
                        Status
                    </span>

                    <span className="detail-value">
                        {item?.status || "-"}
                    </span>
                </div>

                <div className="detail-card">
                    <span className="detail-label">
                        Fornecedor
                    </span>

                    <span className="detail-value">
                        {item?.fornecedor || "-"}
                    </span>
                </div>

                <div className="detail-card">
                    <span className="detail-label">
                        Solicitante
                    </span>

                    <span className="detail-value">
                        {item?.solicitante || "-"}
                    </span>
                </div>

                <div className="detail-card">
                    <span className="detail-label">
                        Referência
                    </span>

                    <span className="detail-value">
                        {item?.referencia_produto || "-"}
                    </span>
                </div>

                <div className="detail-card">
                    <span className="detail-label">
                        Criado em
                    </span>

                    <span className="detail-value">
                        {item?.created_at || "-"}
                    </span>
                </div>

                <div className="detail-card">
                    <span className="detail-label">
                        Atualizado em
                    </span>

                    <span className="detail-value">
                        {item?.updated_at || "-"}
                    </span>
                </div>

                <div className="detail-card observations">
                    <span className="detail-label">
                        Observações
                    </span>

                    <span className="detail-value observations-value">
                        {item?.observacoes || "-"}
                    </span>
                </div>

            </div>

        </section>

    );

}

export default ItemDetails;