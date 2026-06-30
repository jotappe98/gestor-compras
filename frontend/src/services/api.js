const API_URL =
  "http://127.0.0.1:5000"

export async function getItems() {

    const response =
        await fetch(
            `${API_URL}/items`
        )

    if (
        !response.ok
    ) {

        throw new Error(
            "Erro ao carregar itens"
        )

    }

    return (
        response.json()
    )

}