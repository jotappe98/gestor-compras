from app.models.requester import Requester


class RequesterRepository:

    @staticmethod
    def get_by_codigo_erp(codigo_erp):

        return (
            Requester.query
            .filter_by(
                codigo_erp=codigo_erp,
                ativo=True
            )
            .first()
        )