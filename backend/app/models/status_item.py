from app.extensions import db


class StatusItem(db.Model):

    __tablename__ = "status_item"

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    nome = db.Column(
        db.String(30),
        nullable=False
    )