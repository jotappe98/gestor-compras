const API_URL =
  "http://127.0.0.1:5000"

export async function getItems(queryParams) {

    const params = new URLSearchParams({

        page: queryParams.page,
        search: queryParams.search,
        order: queryParams.order,
        category: queryParams.category,
        priority: queryParams.priority,
        requester: queryParams.requester,
        reference: queryParams.reference,

    });

    const response = await fetch(

        `${API_URL}/items?${params}`

    );

    if (!response.ok) {

        throw new Error(
            "Erro ao carregar itens"
        );

    }

    return response.json();

}




export async function getItemPage(id, queryParams) {

    const params = new URLSearchParams({

        search: queryParams.search || "",
        order: queryParams.order || "priority_asc",
        category: queryParams.category || "",
        priority: queryParams.priority || "",
        requester: queryParams.requester || "",
        reference: queryParams.reference || "",
        limit: queryParams.limit || 15,

    });

    const response = await fetch(
        `${API_URL}/items/${id}/page?${params}`
    );

    if (!response.ok) {

        throw new Error(
            "Erro ao localizar a página do item."
        );

    }

    return response.json();

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


export async function getRequesterByCode(codigo) {

    const response = await fetch(
        `${API_URL}/requesters/code/${codigo}`
    );

    if (!response.ok) {

        throw new Error(
            "Solicitante não encontrado"
        );

    }

    return response.json();

}


export async function createItem(itemData) {
    const response = await fetch(
        `${API_URL}/items`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(itemData),
        }
    );

    const data = await response.json();

    if (!response.ok || data.ok === false) {
        const error = new Error(
            data.message || "Erro ao adicionar item"
        );

        error.status = response.status;
        error.data = data;

        throw error;
    }

    return data;
}


export async function completeItem(id) {

    const response = await fetch(
        `${API_URL}/items/${id}/complete`,
        {
            method: "PATCH",
        }
    );

    if (!response.ok) {

        throw new Error(
            "Erro ao marcar item como realizado."
        );

    }

    return response.json();

}


export async function updateItem(id, itemData) {

    const response = await fetch(
        `${API_URL}/items/${id}`,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(itemData),
        }
    );

    const data = await response.json();

    if (!response.ok || data.ok === false) {

        const error = new Error(
            data.message || "Erro ao atualizar item"
        );

        error.status = response.status;
        error.data = data;

        throw error;
    }

    return data;
}