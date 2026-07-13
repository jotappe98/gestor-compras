import logo from "../../assets/logoFM.png";

import SearchBar from "../SearchBar/SearchBar";
import Filters from "../Filters/Filters";

import "../../styles/Header.css";

function Header({ 

        search,
        onSearchChange,

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
                />

                <Filters />

            </div>

        </header>
    );
}

export default Header;