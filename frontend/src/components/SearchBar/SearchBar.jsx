import { FaSearch } from "react-icons/fa";

import "../../styles/SearchBar.css";

function SearchBar() {

    return (

        <div className="search-container">

            <FaSearch className="search-icon" />

            <input
                className="search-input"
                placeholder="Buscar produto, fornecedor ou solicitante..."
            />

        </div>

    );

}

export default SearchBar;