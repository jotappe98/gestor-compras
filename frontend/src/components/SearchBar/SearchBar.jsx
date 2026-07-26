import { FaSearch} from "react-icons/fa";
import { IoCloseCircle } from "react-icons/io5";
import "../../styles/SearchBar.css";

function SearchBar({
    
        value,
        onChange,
        onClear,
    }) {


    return (

        <div className="search-container">

            <FaSearch className="search-icon" />

            <input
                className="search-input"
                placeholder="Buscar produto, fornecedor, referência ou solicitante..."
                value={value}
                onChange={onChange}
            />
            {value && (
                <IoCloseCircle
                    className="clear-search"
                    onClick={onClear}
                />
            )}

        </div>

    );

}

export default SearchBar;