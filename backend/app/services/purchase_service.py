from app.models.purchase_item import (
    PurchaseItem
)

from app.repositories.purchase_repository import (
    PurchaseRepository
)

from app.schemas.purchase_schema import (
    PurchaseCreateSchema
)


class PurchaseService:


    @staticmethod
    def create(data):

        errors = (
            PurchaseCreateSchema
            .validate(data)
        )

        if errors:

            return {
                "ok": False,
                "errors": errors,
            }


        duplicate = (
            PurchaseRepository
            .find_duplicate(
                data["produto"]
            )
        )


        if (
            duplicate
            and
            not data.get(
                "confirm_duplicate"
            )
        ):

            return {

                "ok": False,

                "duplicate": True,

                "message":
                (
                    "Esse item já existe. "
                    "Adicionar mesmo assim?"
                )
            }


        item = PurchaseItem(

            produto=data["produto"],

            quantidade=data[
                "quantidade"
            ],

            categoria_id=data[
                "categoria_id"
            ],

            prioridade_id=data[
                "prioridade_id"
            ],

            status_id=1,

            referencia_produto=data.get(
                "referencia_produto"
            ),

            observacoes=data.get(
                "observacoes"
            ),

            fornecedor_id=data.get(
                "fornecedor_id"
            ),

            solicitante_id=data.get(
                "solicitante_id"
            ),

        )


        PurchaseRepository.create(
            item
        )


        return {
            "ok": True
        }


    @staticmethod
    def mark_as_ordered(item_id):

        item = (
            PurchaseRepository
            .mark_as_ordered(
                item_id
            )
        )

        if not item:

            return {

                "ok": False,

                "message":
                "Item não encontrado"
            }


        return {

            "ok": True,

            "message":
            "Pedido realizado"
        }


    @staticmethod
    def get_pending():

        from flask import request


        categoria = request.args.get(
            "categoria",
            type=int
        )

        prioridade = request.args.get(
            "prioridade",
            type=int
        )

        page = request.args.get(
            "page",
            default=1,
            type=int
        )

        limit = request.args.get(
            "limit",
            default=20,
            type=int
        )


        data = (

            PurchaseRepository
            .get_pending(
                categoria,
                prioridade,
                page,
                limit
            )

        )


        result = []


        for item in data["items"]:

            result.append({

                "id": item.id,

                "produto": item.produto,

                "quantidade": item.quantidade,

                "status": item.status.nome,

                "categoria": item.categoria.nome,

                "prioridade_id": item.prioridade_id,

                "prioridade": item.prioridade.nome,

                "fornecedor": (
                    item.fornecedor.nome
                    if item.fornecedor
                    else "-"
                ),

                "solicitante": (
                    item.solicitante.nome
                    if item.solicitante
                    else "-"
                )

            })


        return {

            "items":
            result,

            "page":
            data["page"],

            "limit":
            data["limit"],

            "total":
            data["total"],

            "total_pages":
            data["total_pages"]

        }


    @staticmethod
    def get_history():

        items = (
            PurchaseRepository
            .get_history()
        )

        result = []

        for item in items:

            result.append({

                "id": item.id,

                "produto": item.produto,

                "quantidade": item.quantidade,

                "status": item.status.nome,

                "categoria": item.categoria.nome,

                "prioridade_id": item.prioridade_id,

                "prioridade": item.prioridade.nome,

                "fornecedor": (
                    item.fornecedor.nome
                    if item.fornecedor
                    else "-"
                ),

                "solicitante": (
                    item.solicitante.nome
                    if item.solicitante
                    else "-"
                )

            })


        return result


        @staticmethod
        def move_to_trash(item_id):

            item = (
                PurchaseRepository
                .move_to_trash(
                    item_id
                )
            )

            if not item:

                return {

                    "ok": False,

                    "message":
                    "Item não encontrado"
                }


            return {

                "ok": True,

                "message":
                "Item movido para lixeira"
            }


        @staticmethod
        def get_trash():

            items = (
                PurchaseRepository
                .get_trash()
            )

            result = []

            for item in items:

                result.append({

                    "id": item.id,

                    "produto": item.produto,

                    "quantidade": item.quantidade,

                    "status": item.status.nome,

                    "categoria": item.categoria.nome,

                    "prioridade_id": item.prioridade_id,

                    "prioridade": item.prioridade.nome,

                    "fornecedor": (
                        item.fornecedor.nome
                        if item.fornecedor
                        else "-"
                    ),

                    "solicitante": (
                        item.solicitante.nome
                        if item.solicitante
                        else "-"
                    ),

                    "movido_lixeira": item.movido_lixeira

                })

            return result


        @staticmethod
        def restore_item(
            item_id
        ):

            item = (

                PurchaseRepository
                .get_by_id(
                    item_id
                )

            )

            if not item:

                return {

                    "error":
                    "Item não encontrado"

                }, 404


            if not item.movido_lixeira:

                return {

                    "error":
                    "Item não está na lixeira"

                }, 400


            (

                PurchaseRepository
                .restore_item(
                    item_id
                )

            )

            return {

                "message":
                "Item restaurado com sucesso"

            }, 200


        @staticmethod
        def search_pending(
            query
        ):

            items = (

                PurchaseRepository
                .search_pending(
                    query
                )

            )

            result = []

            for item in items:

                result.append({

                    "id": item.id,

                    "produto": item.produto,

                    "quantidade": item.quantidade,

                    "status": item.status.nome,

                    "categoria": item.categoria.nome,

                    "prioridade_id": item.prioridade_id,

                    "prioridade": item.prioridade.nome,

                    "fornecedor": (
                        item.fornecedor.nome
                        if item.fornecedor
                        else "-"
                    ),

                    "solicitante": (
                        item.solicitante.nome
                        if item.solicitante
                        else "-"
                    )

                })

            return result


        @staticmethod
        def get_by_id(
            item_id
        ):

            item = (

                PurchaseRepository
                .get_by_id(
                    item_id
                )

            )

            if not item:

                return {

                    "error":
                    "Item não encontrado"

                }, 404

            return {

                "id":
                item.id,

                "produto":
                item.produto,

                "quantidade":
                item.quantidade,

                "referencia_produto":
                item.referencia_produto,

                "observacoes":
                item.observacoes,

                "categoria_id":
                item.categoria_id,

                "categoria":
                item.categoria.nome,

                "prioridade_id":
                item.prioridade_id,

                "prioridade":
                item.prioridade.nome,

                "status_id":
                item.status_id,

                "status":
                item.status.nome,

                "fornecedor_id":
                item.fornecedor_id,

                "fornecedor":
                (
                    item.fornecedor.nome
                    if item.fornecedor
                    else "-"
                ),

                "solicitante_id":
                item.solicitante_id,

                "solicitante":
                (
                    item.solicitante.nome
                    if item.solicitante
                    else "-"
                ),

                "movido_lixeira":
                item.movido_lixeira,

                "created_at":
                item.created_at,

                "updated_at":
                item.updated_at

            }