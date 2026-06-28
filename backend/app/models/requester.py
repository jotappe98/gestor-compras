from app.extensions import db


class Requester(db.Model):

    __tablename__ = "solicitantes"

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    nome = db.Column(
        db.String(100),
        nullable=False
    )