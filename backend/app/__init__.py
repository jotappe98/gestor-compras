from flask import Flask
from flask_cors import CORS

from app.config.settings import Config
from app.extensions import db
from app.routes.purchase_routes import (
    purchase_bp
)
from app.models.category import Category
from app.models.priority import Priority
from app.models.status_item import StatusItem
from app.models.supplier import Supplier
from app.models.requester import Requester
from app.models.purchase_item import PurchaseItem
from app.routes.requester_routes import (
    requester_bp
)


def create_app():

    app = Flask(__name__)

    app.config.from_object(Config)

    CORS(app)

    db.init_app(app)

    app.register_blueprint(
    purchase_bp
    )

    app.register_blueprint(
        requester_bp
    )

    @app.route("/")
    def home():

        return {
            "mensagem": "backend funcionando"
        }

    return app