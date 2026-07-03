import { FiFilter } from "react-icons/fi";

import "../../styles/Filters.css";

function Filters() {

    return (

        <button className="filter-button">

            <FiFilter />

            <span>Filtros</span>

        </button>

    );

}

export default Filters;