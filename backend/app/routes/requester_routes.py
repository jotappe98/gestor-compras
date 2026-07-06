from flask import Blueprint

from app.services.requester_service import (
    RequesterService
)

requester_bp = Blueprint(
    "requesters",
    __name__
)


@requester_bp.get(
    "/requesters/code/<int:codigo_erp>"
)
def get_requester_by_code(codigo_erp):

    return (
        RequesterService
        .get_by_codigo_erp(
            codigo_erp
        )
    )