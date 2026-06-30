import { useEffect, useState } from "react"
import { getItems } from "../../services/api"
import ItemCard from "../../components/ItemCard/ItemCard"
import "../../styles/ItemCard.css"

function PendingItems() {
  const [items, setItems] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getItems()
        setItems(data.items)
      } catch (error) {
        console.log(error)
      }
    }

    fetchData()
  }, [])

  return (
    <div>
      <h1>Itens Pendentes</h1>
      {items.map(item => (
        <ItemCard
            key={item.id}
            item={item}
        />
      ))}
    </div>
  )
}

export default PendingItems