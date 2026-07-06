from app.repositories.requester_repository import (
    RequesterRepository
)


class RequesterService:

    @staticmethod
    def get_by_codigo_erp(codigo_erp):

        requester = (
            RequesterRepository
            .get_by_codigo_erp(
                codigo_erp
            )
        )

        if not requester:

            return {
                "ok": False,
                "message": "Solicitante não encontrado"
            }, 404

        return {

            "id": requester.id,

            "nome": requester.nome,

            "codigo_erp": requester.codigo_erp

        }, 200