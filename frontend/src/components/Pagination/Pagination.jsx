import "../../styles/Pagination.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

function Pagination({

    page,

    totalPages,

}) {

    return (

        <div className="pagination">

            <button
                className="pagination-button"
                disabled
            >

                <FaChevronLeft />

                Anterior

            </button>

            <span className="pagination-info">

                Página {page} de {totalPages}

            </span>

            <button
                className="pagination-button"
                disabled
            >

                Próxima

                <FaChevronRight />

            </button>

        </div>

    );

}

export default Pagination;