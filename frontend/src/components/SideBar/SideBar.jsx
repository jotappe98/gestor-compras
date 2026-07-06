import "../../styles/SideBar.css";

import {
    FaHome,
    FaTrash,
    FaHistory
} from "react-icons/fa";

function Sidebar() {
    return (
        <aside className="sidebar">

            <button>
                <FaHome />
                <span>Página Principal</span>
            </button>

            <button>
                <FaHistory />
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