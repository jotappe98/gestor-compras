from app.extensions import db


class Priority(db.Model):

    __tablename__ = "prioridades"

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    nome = db.Column(
        db.String(20),
        nullable=False
    )