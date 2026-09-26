import { useEffect, useRef, useState } from "react";

import "../../styles/ItemsTable.css";
import ItemRow from "../ItemRow/ItemRow";

function ItemsTable({
    items,
    selectedItemId,
    onSelectItem,
    activeFiltersCount,
    onComplete,
    onEdit,
    pendingScrollItemId,
    onPendingScrollComplete,
}) {
    const itemsBodyRef = useRef(null);

    const [highlightedItemId, setHighlightedItemId] =
        useState(null);

    // Localiza o item recém-cadastrado e leva a página até ele
    useEffect(() => {
        if (pendingScrollItemId == null) return;

        const container = itemsBodyRef.current;

        if (!container) return;

        const targetRow = container.querySelector(
            `[data-item-id="${pendingScrollItemId}"]`
        );

        // Aguarda o item aparecer na página correta
        if (!targetRow) return;

        // Rola suavemente até o item
        targetRow.scrollIntoView({
            behavior: "smooth",
            block: "center",
            inline: "nearest",
        });

        // Ativa o destaque visual
        setHighlightedItemId(pendingScrollItemId);

        // Limpa o ID pendente para não repetir a ação
        onPendingScrollComplete();

    }, [
        items,
        pendingScrollItemId,
        onPendingScrollComplete,
    ]);

    // Remove o destaque após 3 segundos
    useEffect(() => {
        if (highlightedItemId == null) return;

        const timer = setTimeout(() => {
            setHighlightedItemId(null);
        }, 3000);

        return () => clearTimeout(timer);

    }, [highlightedItemId]);

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

            <div
                className="items-body"
                ref={itemsBodyRef}
            >

                {items.length === 0 ? (

                    <div className="no-items-message">

                        {
                            activeFiltersCount > 0
                                ? "Nenhum item encontrado para os filtros selecionados."
                                : "Nenhum item encontrado."
                        }

                    </div>

                ) : (

                    items.map((item) => (

                        <ItemRow
                            key={item.id}
                            item={item}
                            number={item.position}
                            selected={selectedItemId === item.id}
                            highlighted={
                                highlightedItemId === item.id
                            }
                            onClick={() => onSelectItem(item.id)}
                            onComplete={onComplete}
                            onEdit={onEdit}
                        />

                    ))

                )}

            </div>

        </div>
    );
}

export default ItemsTable;