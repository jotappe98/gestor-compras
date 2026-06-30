from flask import (
    Blueprint,
    request,
)

from app.services.purchase_service import (
    PurchaseService
)


purchase_bp = Blueprint(
    "purchase",
    __name__,
)


@purchase_bp.route(
    "/items",
    methods=["POST"],
)
def create_item():

    data = request.json

    result = (
        PurchaseService
        .create(data)
    )

    return result

@purchase_bp.route(
    "/items/<int:item_id>/complete",
    methods=["PATCH"]
)
def complete_item(

    item_id

):

    return (

        PurchaseService
        .mark_as_ordered(
            item_id
        )

    )

@purchase_bp.route(
    "/items",
    methods=["GET"]
)
def get_items():

    return (
        PurchaseService
        .get_pending()
    )


@purchase_bp.route(
    "/items/history",
    methods=["GET"]
)
def history():

    return (
        PurchaseService
        .get_history()
    )

@purchase_bp.route(
    "/items/<int:item_id>/trash",
    methods=["PATCH"]
)
def move_to_trash(
    item_id
):

    return (
        PurchaseService
        .move_to_trash(
            item_id
        )
    )

@purchase_bp.route(
"/items/trash",
methods=["GET"]
)
def trash():

    return (
        PurchaseService
        .get_trash()
    )


@purchase_bp.route(
    "/items/<int:item_id>/restore",
    methods=["PATCH"]
)
def restore_item(
    item_id
):

    return (

        PurchaseService
        .restore_item(
            item_id
        )

    )


@purchase_bp.route(
    "/items/search",
    methods=["GET"]
)
def search_items():

    query = request.args.get(
        "q",
        ""
    )

    return (

        PurchaseService
        .search_pending(
            query
        )

    )


@purchase_bp.route(
    "/items/<int:item_id>",
    methods=["GET"]
)
def get_item_details(
    item_id
):

    return (

        PurchaseService
        .get_by_id(
            item_id
        )

    )