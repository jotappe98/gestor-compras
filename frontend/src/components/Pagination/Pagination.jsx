import "../../styles/Pagination.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

function Pagination({

    page,
    totalPages,
    hasPrevious,
    hasNext,
    onPrevious,
    onNext,

}) {

    return (

        <div className="pagination">

            <button
                className="pagination-button"
                onClick={onPrevious}
                disabled={!hasPrevious}
            >

                <FaChevronLeft />

                Anterior

            </button>

            <span className="pagination-info">

                Página {page} de {totalPages}

            </span>

            <button
                className="pagination-button"
                onClick={onNext}
                disabled={!hasNext}
            >

                Próxima

                <FaChevronRight />

            </button>

        </div>

    );

}

export default Pagination;