import { useEffect, useState } from "react"
import { getItems } from "../../services/api"
import Header from "../../components/Header/Header"
import Sidebar from "../../components/Sidebar/Sidebar"
import ItemCard from "../../components/ItemCard/ItemCard"
import "../../styles/PendingItems.css"

function PendingItems() {

    const [items, setItems] =
        useState([])

    useEffect(() => {

        async function fetchData() {

            try {

                const data =
                    await getItems()

                setItems(
                    data.items
                )

            }

            catch (error) {

                console.log(
                    error
                )

            }

        }

        fetchData()

    }, [])

    return (

        <div
            className="pending-page"
        >

            <Header />

            <div
                className="content-area"
            >

                <Sidebar />

                <main
                    className="main-content"
                >

                    <div className="pending-header">

                      <div className="pending-left">

                          <h1 className="pending-title">

                              Pedidos

                          </h1>

                          <div className="sort-row">

                              <select
                                  className="sort-select"
                              >

                                  <option>

                                      Ordem crescente

                                  </option>

                                  <option>

                                      Ordem decrescente

                                  </option>

                                  <option>

                                      Quantidade

                                  </option>

                                  <option>

                                      Mais recentes

                                  </option>

                              </select>

                          </div>

                      </div>

                      <div
                          className="pending-actions"
                      >

                          <button
                              className="add-button"
                          >

                              + Adicionar item

                          </button>

                      </div>

                  </div>

                    <div
                        className="items-list"
                    >

                        {
                            items.map(
                                item => (

                                    <ItemCard
                                        key={
                                            item.id
                                        }

                                        item={
                                            item
                                        }
                                    />

                                )
                            )
                        }

                    </div>

                </main>

            </div>

        </div>

    )

}

export default (
    PendingItems
)