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


        for field in PurchaseCreateSchema.required_fields:

            if field not in data:

                errors.append(
                    f"{field} é obrigatório"
                )


        if (
            "produto" in data
            and len(
                data["produto"]
            ) > 150
        ):

            errors.append(
                "produto muito grande"
            )


        if (
            "quantidade" in data
            and data["quantidade"] <= 0
        ):

            errors.append(
                "quantidade inválida"
            )


        return errors