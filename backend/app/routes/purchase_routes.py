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