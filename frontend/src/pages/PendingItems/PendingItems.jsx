import { useEffect, useState } from "react";
import { getItems, getItemById } from "../../services/api";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import ItemsTable from "../../components/ItemsTable/ItemsTable";
import ItemDetails from "../../components/ItemDetails/ItemDetails";
import "../../styles/PendingItems.css";
import { FaPlusCircle } from "react-icons/fa";

function PendingItems() {
    const [items, setItems] = useState([]);
    const [selectedItemId, setSelectedItemId] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await getItems();
                setItems(data.items);
            } catch (error) {
                console.log(error);
            }
        }

        fetchData();
    }, []);

    useEffect(() => {
        async function fetchItemDetails() {
            if (!selectedItemId) {
                setSelectedItem(null);
                return;
            }

            try {
                const item = await getItemById(selectedItemId);
                setSelectedItem(item);
            } catch (error) {
                console.log(error);
            }
        }

        fetchItemDetails();
    }, [selectedItemId]);

    return (
        <div className="pending-page">
            <Header />

            <div className="content-area">
                <Sidebar />

                <main className="main-content">
                    <div className="pending-header">
                        <div className="pending-left">
                            <h1 className="pending-title">
                                Pedidos
                            </h1>

                            <div className="sort-row">
                                <select className="sort-select">
                                    <option>Ordem crescente</option>
                                    <option>Ordem decrescente</option>
                                    <option>Quantidade</option>
                                    <option>Mais recentes</option>
                                </select>
                            </div>
                        </div>

                        <div className="pending-actions">
                            <button className="add-button">
                                <FaPlusCircle />
                                Adicionar item
                            </button>
                        </div>
                    </div>

                    <div className="items-section">
                        <ItemsTable
                            items={items}
                            selectedItemId={selectedItemId}
                            onSelectItem={setSelectedItemId}
                        />
                    </div>

                    <ItemDetails 
                        item={selectedItem} 
                    />
                </main>
            </div>
        </div>
    );
}

export default PendingItems;