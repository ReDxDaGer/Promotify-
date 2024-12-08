from flask import Flask
from flask_cors import CORS
from database.database import db, init_db  
from routes.auth import auth  

app = Flask(__name__)

# Configuration for SQLAlchemy and other settings
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'secret_key'

# Initialize CORS
CORS(app)

# Initialize the database
db.init_app(app)
with app.app_context():
    init_db()  # Ensure database is initialized

# Register the blueprint
app.register_blueprint(auth, url_prefix='/auth')

# Root route
@app.route('/')
def index():
    return {'message': 'Hello, World!'}

if __name__ == '__main__':
    app.run(debug=True, port=8000, host='0.0.0.0')
