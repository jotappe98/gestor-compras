import "../../styles/SideBar.css";

import {
    FaHome,
    FaTrash,
    FaHistory
} from "react-icons/fa";

function Sidebar() {

    return (

        <aside className="sidebar">

            <div className="sidebar-top">

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

            </div>

            <div className="sidebar-bottom">

                {/* Área reservada para futuras Relações */}

            </div>

        </aside>

    );

}

export default Sidebar;