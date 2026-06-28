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

        items = (
            PurchaseRepository
            .get_pending()
        )

        result = []

        for item in items:

            result.append({

                "id":
                item.id,

                "produto":
                item.produto,

                "quantidade":
                item.quantidade,

                "status_id":
                item.status_id,

                "categoria_id":
                item.categoria_id,

                "prioridade_id":
                item.prioridade_id

            })


        return result
    
    @staticmethod
    def get_history():

        items = (
            PurchaseRepository
            .get_history()
        )

        result = []

        for item in items:

            result.append({

                "id":
                item.id,

                "produto":
                item.produto,

                "quantidade":
                item.quantidade,

                "status_id":
                item.status_id,

                "categoria_id":
                item.categoria_id,

                "prioridade_id":
                item.prioridade_id

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

                "id":
                item.id,

                "produto":
                item.produto,

                "quantidade":
                item.quantidade,

                "status_id":
                item.status_id,

                "categoria_id":
                item.categoria_id,

                "prioridade_id":
                item.prioridade_id,

                "movido_lixeira":
                item.movido_lixeira

            })


        return result