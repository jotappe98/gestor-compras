import "../../styles/SideBar.css";

import {
    FaHome,
    FaTrash,
    FaSearch
} from "react-icons/fa";

function Sidebar() {
    return (
        <aside className="sidebar">

            <button>
                <FaHome />
                <span>Página Principal</span>
            </button>

            <button>
                <FaSearch />
                <span>Histórico</span>
            </button>

            <button>
                <FaTrash />
                <span>Lixeira</span>
            </button>

        </aside>
    );
}

export default Sidebar;