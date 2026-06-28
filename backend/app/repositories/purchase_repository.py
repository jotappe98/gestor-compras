from app.extensions import db
from sqlalchemy import func
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
    def mark_as_ordered(item_id):

        item = (
            PurchaseItem.query
            .get(item_id)
        )

        if not item:

            return None


        item.status_id = 2


        db.session.commit()


        return item
    
    @staticmethod
    def mark_as_ordered(item_id):

        item = (
            PurchaseItem
            .query
            .get(item_id)
        )

        if not item:

            return None


        item.status_id = 2


        db.session.commit()

        return item


    @staticmethod
    def create(item):

        db.session.add(item)

        db.session.commit()

        return item