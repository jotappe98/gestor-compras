import { FiFilter } from "react-icons/fi";
import "../../styles/Filters.css";

function Filters({ onOpen, activeFiltersCount }) {

    return (

        <button
            className="filter-button"
            onClick={onOpen}
        >

            <FiFilter />

            <span>Filtros</span>

            {activeFiltersCount > 0 && (
                <span className="filters-badge">
                    ({activeFiltersCount})
                </span>
            )}

        </button>

    );

}

export default Filters;