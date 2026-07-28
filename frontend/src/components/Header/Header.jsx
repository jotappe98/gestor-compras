import logo from "../../assets/logoFM.png";

import SearchBar from "../SearchBar/SearchBar";
import Filters from "../Filters/Filters";

import "../../styles/Header.css";

function Header({ 

        search,
        onSearchChange,
        onClearSearch,
        onOpenFilters,
        activeFiltersCount,

        }) {

    return (
        <header className="header">

            <div className="header-logo">
                <img
                    src={logo}
                    alt="Ferragem Monteiro"
                    className="logo"
                />
            </div>

            <div className="header-actions">

                <SearchBar
                    value={search}
                    onChange={onSearchChange}
                    onClear={onClearSearch}
                />

                <Filters
                    onOpen={onOpenFilters}
                    activeFiltersCount={activeFiltersCount}
                />

            </div>

        </header>
    );
}

export default Header;