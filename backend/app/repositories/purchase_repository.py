from app.extensions import db
from sqlalchemy import func
from sqlalchemy import (
    func,
    or_
)
from app.models.purchase_item import (
    PurchaseItem,
)


class PurchaseRepository:

    @staticmethod
    def find_duplicate(produto):

        return (
            PurchaseItem.query
            .filter(
                func.lower(
                    PurchaseItem.produto
                )
                ==
                produto.lower(),

                PurchaseItem.status_id == 1,

                PurchaseItem.movido_lixeira
                == False
            )
            .first()
        )

    @staticmethod
    def get_by_id(
        item_id
    ):

        return (
            PurchaseItem
            .query
            .get(
                item_id
            )
        )

    @staticmethod
    def mark_as_ordered(
        item_id
    ):

        item = (
            PurchaseItem
            .query
            .get(
                item_id
            )
        )

        if not item:

            return None

        item.status_id = 2

        db.session.commit()

        return item

    @staticmethod
    def create(
        item
    ):

        db.session.add(
            item
        )

        db.session.commit()

        return item

    @staticmethod
    def get_pending():

        return (
            PurchaseItem.query
            .filter(
                PurchaseItem.status_id == 1,

                PurchaseItem.movido_lixeira
                == False
            )
            .all()
        )

    @staticmethod
    def get_history():

        return (
            PurchaseItem.query
            .filter(
                PurchaseItem.status_id == 2,

                PurchaseItem.movido_lixeira
                == False
            )
            .all()
        )

    @staticmethod
    def move_to_trash(
        item_id
    ):

        item = (
            PurchaseItem
            .query
            .get(
                item_id
            )
        )

        if not item:

            return None

        item.movido_lixeira = True

        db.session.commit()

        return item

    @staticmethod
    def get_trash():

        return (
            PurchaseItem.query
            .filter(
                PurchaseItem.movido_lixeira
                == True
            )
            .all()
        )

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

            return None

        item.movido_lixeira = False

        db.session.commit()

        return item
    

    @staticmethod
    def search_pending(
        query
    ):

        query = query.strip()

        return (

            PurchaseItem
            .query
            .filter(

                PurchaseItem.status_id == 1,

                PurchaseItem.movido_lixeira == False,

                or_(

                    PurchaseItem.produto.ilike(
                        f"%{query}%"
                    ),

                    PurchaseItem.referencia_produto.ilike(
                        f"%{query}%"
                    )

                )

            )
            .all()

        )
        

