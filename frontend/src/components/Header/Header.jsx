import logo from "../../assets/logoFM.png";

import SearchBar from "../SearchBar/SearchBar";
import Filters from "../Filters/Filters";

import "../../styles/Header.css";

function Header() {
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

                <SearchBar />

                <Filters />

            </div>

        </header>
    );
}

export default Header;