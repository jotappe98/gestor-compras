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

export async function getItemById(id) {

    const response = await fetch(
        `${API_URL}/items/${id}`
    );

    if (!response.ok) {

        throw new Error(
            "Erro ao carregar detalhes do item."
        );

    }

    return response.json();

}