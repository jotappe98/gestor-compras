from app.extensions import db


class PurchaseItem(db.Model):

    __tablename__ = "itens_compra"


    id = db.Column(
        db.Integer,
        primary_key=True
    )


    produto = db.Column(
        db.String(150),
        nullable=False
    )


    quantidade = db.Column(
        db.Integer,
        nullable=False,
        default=1
    )


    referencia_produto = db.Column(
        db.String(100)
    )


    observacoes = db.Column(
        db.String(300)
    )


    movido_lixeira = db.Column(
        db.Boolean,
        default=False
    )


    categoria_id = db.Column(
        db.Integer,
        db.ForeignKey("categorias.id"),
        nullable=False
    )


    prioridade_id = db.Column(
        db.Integer,
        db.ForeignKey("prioridades.id"),
        nullable=False
    )


    status_id = db.Column(
        db.Integer,
        db.ForeignKey("status_item.id"),
        nullable=False
    )


    fornecedor = db.Column(
    db.String(120),
    nullable=True
    )


    solicitante_id = db.Column(
        db.Integer,
        db.ForeignKey("solicitantes.id")
    )


    created_at = db.Column(
        db.DateTime,
        server_default=db.func.now()
    )


    updated_at = db.Column(
        db.DateTime,
        server_default=db.func.now(),
        onupdate=db.func.now()
    )

    categoria = db.relationship(
    "Category"
    )

    prioridade = db.relationship(
        "Priority"
    )

    status = db.relationship(
        "StatusItem"
    )


    solicitante = db.relationship(
        "Requester"
    )

   

 