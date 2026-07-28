import { useEffect, useState } from "react";
import { getItems, getItemById } from "../../services/api";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import ItemsTable from "../../components/ItemsTable/ItemsTable";
import ItemDetails from "../../components/ItemDetails/ItemDetails";
import Pagination from "../../components/Pagination/Pagination";
import FiltersModal from "../../components/FiltersModal/FiltersModal";
import "../../styles/PendingItems.css";
import { FaPlusCircle } from "react-icons/fa";

function PendingItems() {
    const [itemsData, setItemsData] = useState({
        items: [],
        page: 1,
        total: 0,
        total_pages: 1,
        limit: 15,
    });

    const [queryParams, setQueryParams] = useState({
        search: "",
        order: "asc",
        category: "",
        priority: "",
        requester: "",
        reference: "",
    });

    const [selectedItemId, setSelectedItemId] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);

    const [mainPage, setMainPage] = useState(1);
    const [searchPage, setSearchPage] = useState(1);

    const [isFiltersOpen, setIsFiltersOpen] = useState(false);

    const [filters, setFilters] = useState({
        category: "",
        priority: "",
        requester: "",
        reference: "",
    });

    const activeFiltersCount = Object.values(filters)
    .filter((value) => value !== "")
    .length;

    useEffect(() => {
        async function fetchData() {
            try {
                const page =
                    queryParams.search.trim() === ""
                        ? mainPage
                        : searchPage;

                const data = await getItems({
                    ...queryParams,
                    page,
                });

                setItemsData(data);
                setSelectedItemId(null);
                setSelectedItem(null);
            } catch (error) {
                console.log(error);
            }
        }

        fetchData();
    }, [queryParams, mainPage, searchPage]);

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
            <Header
                search={queryParams.search}
                onSearchChange={(event) => {
                    const value = event.target.value;

                    setQueryParams((prev) => {
                        if (prev.search === "" && value !== "") {
                            setSearchPage(1);

                            return {
                                ...prev,
                                search: value,
                            };
                        }

                        if (prev.search !== "" && value === "") {
                            setSearchPage(1);

                            return {
                                ...prev,
                                search: "",
                            };
                        }

                        return {
                            ...prev,
                            search: value,
                        };
                    });
                }}
                onClearSearch={() => {
                    setSearchPage(1);

                    setQueryParams((prev) => ({
                        ...prev,
                        search: "",
                    }));
                }}

                onOpenFilters={() => setIsFiltersOpen(true)}
                activeFiltersCount={activeFiltersCount}

            />

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

                    <div className="workspace">
                        <div className="items-section">
                            <ItemsTable
                                items={itemsData.items}
                                page={itemsData.page}
                                limit={itemsData.limit}
                                selectedItemId={selectedItemId}
                                onSelectItem={setSelectedItemId}
                                activeFiltersCount={activeFiltersCount}
                            />

                            <div className="pagination-container">
                                <Pagination
                                    page={itemsData.page}
                                    totalPages={itemsData.total_pages}
                                    hasPrevious={itemsData.page > 1}
                                    hasNext={itemsData.page < itemsData.total_pages}
                                    onPrevious={() => {
                                        if (itemsData.page <= 1) return;

                                        if (queryParams.search.trim() === "") {
                                            setMainPage((prev) => prev - 1);
                                        } else {
                                            setSearchPage((prev) => prev - 1);
                                        }
                                    }}
                                    onNext={() => {
                                        if (itemsData.page >= itemsData.total_pages) return;

                                        if (queryParams.search.trim() === "") {
                                            setMainPage((prev) => prev + 1);
                                        } else {
                                            setSearchPage((prev) => prev + 1);
                                        }
                                    }}
                                />
                            </div>
                        </div>

                        <ItemDetails item={selectedItem} />
                    </div>
                </main>
            </div>

            <FiltersModal
                isOpen={isFiltersOpen}
                onClose={() => setIsFiltersOpen(false)}
                filters={filters}
                setFilters={setFilters}
                onApply={() => {

                    setMainPage(1);
                    setSearchPage(1);

                    setQueryParams((previous) => ({
                        ...previous,
                        page: 1,
                        category: filters.category,
                        priority: filters.priority,
                        requester: filters.requester,
                        reference: filters.reference,
                    }));

                    setIsFiltersOpen(false);

                }}
            />

        </div>
    );
}

export default PendingItems;