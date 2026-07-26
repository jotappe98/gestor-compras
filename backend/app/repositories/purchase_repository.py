from app.extensions import db
from app.models.requester import Requester
from sqlalchemy import func, or_

from app.models.purchase_item import PurchaseItem


class PurchaseRepository:

    @staticmethod
    def find_duplicate(produto):
        return (
            PurchaseItem.query
            .filter(
                func.lower(PurchaseItem.produto) == produto.lower(),
                PurchaseItem.status_id == 1,
                PurchaseItem.movido_lixeira == False
            )
            .first()
        )

    @staticmethod
    def get_by_id(item_id):
        return PurchaseItem.query.get(item_id)

    @staticmethod
    def mark_as_ordered(item_id):
        item = PurchaseItem.query.get(item_id)

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

    @staticmethod
    def get_pending(
        categoria=None,
        prioridade=None,
        search="",
        page=1,
        limit=20
    ):

        query = (
            PurchaseItem.query
            .join(
                Requester,
                PurchaseItem.solicitante_id == Requester.id
            )
            .filter(
                PurchaseItem.status_id == 1,
                PurchaseItem.movido_lixeira == False
            )
        )

        if categoria:
            query = query.filter(
                PurchaseItem.categoria_id == categoria
            )

        if prioridade:
            query = query.filter(
                PurchaseItem.prioridade_id == prioridade
            )

        query = query.order_by(
            PurchaseItem.prioridade_id.asc(),
            PurchaseItem.created_at.asc(),
            PurchaseItem.id.asc()
        )

        #lista
        all_items = query.all()

        #numeracao fixa
        positions = {
            item.id: index + 1
            for index, item in enumerate(all_items)
        }

        #pesquisa
        if search:

            search = search.strip().lower()

            filtered_items = []

            for item in all_items:

                requester_name = (
                    item.solicitante.nome.lower()
                    if item.solicitante
                    else ""
                )

                fornecedor = (
                    item.fornecedor.lower()
                    if item.fornecedor
                    else ""
                )

                referencia = (
                    item.referencia_produto.lower()
                    if item.referencia_produto
                    else ""
                )

                if (
                    search in item.produto.lower()
                    or search in referencia
                    or search in fornecedor
                    or search in requester_name
                ):
                    filtered_items.append(item)

        else:

            filtered_items = all_items

        total = len(filtered_items)

        total_pages = max(1, (total + limit - 1) // limit)

        start = (page - 1) * limit
        end = start + limit

        page_items = filtered_items[start:end]

        for item in page_items:
            item.position = positions[item.id]

        return {
            "items": page_items,
            "total": total,
            "page": page,
            "limit": limit,
            "total_pages": total_pages
        }

    @staticmethod
    def get_history():
        return (
            PurchaseItem.query
            .filter(
                PurchaseItem.status_id == 2,
                PurchaseItem.movido_lixeira == False
            )
            .all()
        )

    @staticmethod
    def move_to_trash(item_id):
        item = PurchaseItem.query.get(item_id)

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
                PurchaseItem.movido_lixeira == True
            )
            .all()
        )

    @staticmethod
    def restore_item(item_id):
        item = PurchaseRepository.get_by_id(item_id)

        if not item:
            return None

        item.movido_lixeira = False
        db.session.commit()

        return item

    @staticmethod
    def search_pending(query):
        query = query.strip()

        return (
            PurchaseItem.query
            .filter(
                PurchaseItem.status_id == 1,
                PurchaseItem.movido_lixeira == False,
                or_(
                    PurchaseItem.produto.ilike(f"%{query}%"),
                    PurchaseItem.referencia_produto.ilike(f"%{query}%")
                )
            )
            .all()
        )