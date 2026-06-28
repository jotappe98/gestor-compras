from app.extensions import db


class Supplier(db.Model):

    __tablename__ = "fornecedores"

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    nome = db.Column(
        db.String(150),
        nullable=False
    )