class PurchaseCreateSchema:

    required_fields = [
        "produto",
        "quantidade",
        "categoria_id",
        "prioridade_id",
        "solicitante_id"
    ]

    @staticmethod
    def validate(data):

        errors = []

        # Campos obrigatórios
        for field in PurchaseCreateSchema.required_fields:

            if field not in data or data[field] is None:

                errors.append(
                    f"{field} é obrigatório"
                )

        # Produto
        if "produto" in data:

            if not isinstance(data["produto"], str):

                errors.append(
                    "produto deve ser um texto"
                )

            elif not data["produto"].strip():

                errors.append(
                    "produto é obrigatório"
                )

            elif len(data["produto"]) > 150:

                errors.append(
                    "produto muito grande"
                )

        # Quantidade
        if "quantidade" in data:

            if not isinstance(data["quantidade"], int):

                errors.append(
                    "quantidade deve ser um número inteiro"
                )

            elif data["quantidade"] <= 0:

                errors.append(
                    "quantidade inválida"
                )

        # Referência do produto
        if "referencia_produto" in data:

            if not isinstance(
                data["referencia_produto"],
                str
            ):

                errors.append(
                    "referencia_produto deve ser um texto"
                )

            elif len(data["referencia_produto"]) > 100:

                errors.append(
                    "referencia_produto muito grande"
                )

        # Fornecedor
        if "fornecedor" in data:

            if not isinstance(
                data["fornecedor"],
                str
            ):

                errors.append(
                    "fornecedor deve ser um texto"
                )

            elif len(data["fornecedor"]) > 120:

                errors.append(
                    "fornecedor muito grande"
                )

        # Observações
        if "observacoes" in data:

            if not isinstance(
                data["observacoes"],
                str
            ):

                errors.append(
                    "observacoes deve ser um texto"
                )

            elif len(data["observacoes"]) > 300:

                errors.append(
                    "observacoes muito grande"
                )

        return errors