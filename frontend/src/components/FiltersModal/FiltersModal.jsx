import "../../styles/FiltersModal.css";

function FiltersModal({
    isOpen,
    onClose,
    filters,
    setFilters,
    onApply,
}) {

    if (!isOpen) {
        return null;
    }


    const handleChange = (event) => {

        const { name, value } = event.target;

        setFilters((previous) => ({
            ...previous,
            [name]: value,
        }));

    };

    return (
        <div
            className="filters-overlay"
            onClick={onClose}
        >
            <div
                className="filters-modal"
                onClick={(event) => event.stopPropagation()}
            >

                <h2>Filtros</h2>

                <div className="filters-content">

                    <div className="filters-grid">

                        <div className="filter-group">
                            <label>Categoria</label>
                            <select
                                name="category"
                                value={filters.category}
                                onChange={handleChange}
                            >
                                <option value="">Todas</option>

                                <option value="1">Hidráulica</option>
                                <option value="2">Elétrica</option>
                                <option value="3">Eletrônicos</option>
                                <option value="4">Tintas</option>
                                <option value="5">EPIs</option>
                                <option value="6">Ferragens</option>
                                <option value="7">Utensílios</option>
                                <option value="8">Ferramentas</option>
                                <option value="9">Limpeza</option>
                                <option value="10">Outros</option>
                            </select>
                        </div>

                        <div className="filter-group">
                            <label>Prioridade</label>
                            <select
                                name="priority"
                                value={filters.priority}
                                onChange={handleChange}
                            >
                                <option value="">Todas</option>

                                <option value="1">Alta</option>
                                <option value="2">Média</option>
                                <option value="3">Baixa</option>
                            </select>
                        </div>

                        <div className="filter-group">
                            <label>Solicitante</label>
                            <select
                            name="requester"
                            value={filters.requester}
                            onChange={handleChange}
                            >
                                <option value="">Todos</option>

                                <option value="1">1 - Janisa</option>
                                <option value="2">2 - Igor</option>
                                <option value="3">3 - Eliza</option>
                                <option value="4">4 - João</option>
                                <option value="14">14 - Lisiane</option>
                            </select>
                        </div>

                        <div className="filter-group">
                            <label>Referência</label>
                            <select
                                name="reference"
                                value={filters.reference}
                                onChange={handleChange}
                            >
                                <option value="">Todas</option>

                                <option value="with">
                                    Com referência
                                </option>

                                <option value="without">
                                    Sem referência
                                </option>
                            </select>
                        </div>

                    </div>

                </div>

                <div className="filters-actions">

                    <button
                        className="cancel-button"
                        onClick={onClose}
                    >
                        Cancelar
                    </button>

                    <button 
                        className="apply-button"
                        onClick={onApply}
                    >
                        Aplicar
                    </button>

                </div>

            </div>
        </div>
    );
}

export default FiltersModal;