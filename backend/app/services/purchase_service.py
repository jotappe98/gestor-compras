from app.models.purchase_item import (
    PurchaseItem
)
from app.repositories.purchase_repository import (
    PurchaseRepository
)
from app.schemas.purchase_schema import (
    PurchaseCreateSchema
)

from app.repositories.requester_repository import (
    RequesterRepository
)

from app.models.category import Category
from app.models.priority import Priority
from app.models.requester import Requester


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

        categoria = None

        if data.get("categoria_id") is not None:

            categoria = Category.query.get(
                data["categoria_id"]
            )

            if not categoria:

                return {
                    "ok": False,
                    "errors": [
                        "categoria_id inválido"
                    ]
                }

        prioridade = Priority.query.get(
            data["prioridade_id"]
        )

        if not prioridade:

            return {
                "ok": False,
                "errors": [
                    "prioridade_id inválido"
                ]
            }

        requester = (
            RequesterRepository
            .get_by_codigo_erp(
                data["codigo_erp"]
            )
        )

        if not requester:

            return {
                "ok": False,
                "errors": [
                    "codigo_erp inválido ou solicitante inativo"
                ]
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

            quantidade=data.get("quantidade") or 1,

            unidade_medida=data.get(
                "unidade_medida"
            ),

            categoria_id=data.get("categoria_id"),

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

            fornecedor=data.get(
                "fornecedor"
            ),

            solicitante_id=requester.id,

        )

        PurchaseRepository.create(
            item
        )

        return {
            "ok": True,
            "id": item.id
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
            "category",
            type=int
        )

        prioridade = request.args.get(
            "priority",
            type=int
        )

        requester = request.args.get(
            "requester",
            type=int
        )

        reference = request.args.get(
            "reference",
            type=str
        )

        search = request.args.get(
            "search",
            default="",
            type=str
        )

        order = request.args.get(
            "order",
            default="priority_asc",
            type=str
        )

        page = request.args.get(
            "page",
            default=1,
            type=int
        )

        limit = request.args.get(
            "limit",
            default=15,
            type=int
        )

        data = (

            PurchaseRepository
            .get_pending(
                categoria,
                prioridade,
                requester,
                reference,
                search,
                page,
                limit,
                order
            )

        )

        result = []

        for item in data["items"]:

            result.append({

                "position": item.position,
                "id": item.id,

                "produto": item.produto,

                "quantidade": item.quantidade,

                "status": item.status.nome,

                "categoria": (
                    item.categoria.nome
                    if item.categoria
                    else "-"
                ),

                "prioridade_id": item.prioridade_id,

                "prioridade": item.prioridade.nome,

                "fornecedor": (
                    item.fornecedor
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
    def get_page_for_item(item_id):

        from flask import request

        categoria = request.args.get(
            "category",
            type=int
        )

        prioridade = request.args.get(
            "priority",
            type=int
        )

        requester = request.args.get(
            "requester",
            type=int
        )

        reference = request.args.get(
            "reference",
            type=str
        )

        search = request.args.get(
            "search",
            default="",
            type=str
        )

        order = request.args.get(
            "order",
            default="priority_asc",
            type=str
        )

        limit = request.args.get(
            "limit",
            default=15,
            type=int
        )

        # Valida o limite da paginação
        if limit < 1:
            limit = 15

        page = PurchaseRepository.get_page_for_item(
            item_id=item_id,
            categoria=categoria,
            prioridade=prioridade,
            requester=requester,
            reference=reference,
            search=search,
            limit=limit,
            order=order
        )

        return {
            "id": item_id,
            "page": page
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

                "categoria": (
                    item.categoria.nome
                    if item.categoria
                    else "-"
                ),

                "prioridade_id": item.prioridade_id,

                "prioridade": item.prioridade.nome,

                "fornecedor": (
                    item.fornecedor
                    if item.fornecedor
                    else "-"
                ),

                "solicitante": (
                    item.solicitante.nome
                    if item.solicitante
                    else "-"
                ),

                "created_at": (
                    item.created_at.strftime("%d/%m/%Y %H:%M")
                    if item.created_at
                    else "-"
                ),

                "completed_at": (
                    item.completed_at.strftime("%d/%m/%Y %H:%M")
                    if item.completed_at
                    else "-"
                ),

                "trashed_at": (
                    item.trashed_at.strftime("%d/%m/%Y %H:%M")
                    if item.trashed_at
                    else "-"
                ),

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

                "categoria": (
                    item.categoria.nome
                    if item.categoria
                    else "-"
                ),

                "prioridade_id": item.prioridade_id,

                "prioridade": item.prioridade.nome,

                "fornecedor": (
                    item.fornecedor
                    if item.fornecedor
                    else "-"
                ),

                "solicitante": (
                    item.solicitante.nome
                    if item.solicitante
                    else "-"
                ),

                "movido_lixeira": item.movido_lixeira,

                "trashed_at": (
                    item.trashed_at.strftime("%d/%m/%Y %H:%M")
                    if item.trashed_at
                    else "-"
                ),

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

                "categoria": (
                    item.categoria.nome
                    if item.categoria
                    else "-"
                ),

                "prioridade_id": item.prioridade_id,

                "prioridade": item.prioridade.nome,

                "fornecedor": (
                    item.fornecedor
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

            "unidade_medida": item.unidade_medida,

            "referencia_produto":
            item.referencia_produto,

            "observacoes":
            item.observacoes,

            "categoria_id":
            item.categoria_id,

            "categoria": (
                item.categoria.nome
                if item.categoria
                else "-"
            ),

            "prioridade_id":
            item.prioridade_id,

            "prioridade":
            item.prioridade.nome,

            "status_id":
            item.status_id,

            "status":
            item.status.nome,

            "fornecedor":
            (
                item.fornecedor
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

            "codigo_erp": (
                item.solicitante.codigo_erp
                if item.solicitante
                else None
            ),

            "movido_lixeira":
            item.movido_lixeira,

            "created_at": (
                item.created_at.strftime("%d/%m/%Y %H:%M")
                if item.created_at
                else "-"
            ),

            "updated_at": (
                item.updated_at.strftime("%d/%m/%Y %H:%M")
                if item.updated_at
                else "-"
            ),

            "completed_at": (
                item.completed_at.strftime("%d/%m/%Y %H:%M")
                if item.completed_at
                else "-"
            ),

            "trashed_at": (
                item.trashed_at.strftime("%d/%m/%Y %H:%M")
                if item.trashed_at
                else "-"
            )

        }

    @staticmethod
    def update(item_id, data):

        item = (
            PurchaseRepository
            .get_by_id(item_id)
        )

        if not item:
            return {
                "ok": False,
                "message": "Item não encontrado"
            }, 404

        changes = {}

        if "produto" in data:
            produto = data["produto"].strip()

            if produto != item.produto:
                changes["produto"] = produto

        if "quantidade" in data:
            quantidade = data["quantidade"]

            if quantidade != item.quantidade:
                changes["quantidade"] = quantidade

        if "unidade_medida" in data:
            unidade_medida = data["unidade_medida"]
            if unidade_medida != item.unidade_medida:
                changes["unidade_medida"] = unidade_medida

        if "categoria_id" in data:
            categoria_id = data["categoria_id"]

            if categoria_id != item.categoria_id:
                changes["categoria_id"] = categoria_id

        if "prioridade_id" in data:
            prioridade_id = data["prioridade_id"]

            if prioridade_id != item.prioridade_id:
                changes["prioridade_id"] = prioridade_id

        if "fornecedor" in data:
            fornecedor = data["fornecedor"]

            if fornecedor != item.fornecedor:
                changes["fornecedor"] = fornecedor

        if "referencia_produto" in data:
            referencia = data["referencia_produto"]

            if referencia != item.referencia_produto:
                changes["referencia_produto"] = referencia

        if "observacoes" in data:
            observacoes = data["observacoes"]

            if observacoes != item.observacoes:
                changes["observacoes"] = observacoes

        if "codigo_erp" in data:

            requester = (
                RequesterRepository
                .get_by_codigo_erp(
                    data["codigo_erp"]
                )
            )

            if not requester:
                return {
                    "ok": False,
                    "message": (
                        "Código ERP inválido "
                        "ou solicitante inativo"
                    )
                }, 400

            if requester.id != item.solicitante_id:
                changes["solicitante_id"] = requester.id

        if not changes:

            return {
                "ok": True,
                "changed": False,
                "message": "Nenhuma alteração realizada"
            }

        for field, value in changes.items():
            setattr(item, field, value)

        PurchaseRepository.update(item)

        return {
            "ok": True,
            "changed": True,
            "message": "Item atualizado com sucesso"
        }
