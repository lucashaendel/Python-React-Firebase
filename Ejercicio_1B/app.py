from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask.signals import request_started

app = Flask(__name__)

# Configuración de la base de datos MySQL
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://root:admin@localhost:3306/turnos_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# Modelos
class Cliente(db.Model):
    id_cliente = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(50), nullable=False)
    telefono = db.Column(db.String(20), nullable=False)

class Vehiculo(db.Model):
    id_vehiculo = db.Column(db.Integer, primary_key=True)
    marca = db.Column(db.String(50), nullable=False)
    modelo = db.Column(db.String(50), nullable=False)
    año = db.Column(db.Integer, nullable=False)
    precio = db.Column(db.Float, nullable=False)

class Turno(db.Model):
    id_turno = db.Column(db.Integer, primary_key=True)
    id_cliente = db.Column(db.Integer, db.ForeignKey('cliente.id_cliente'), nullable=False)
    id_vehiculo = db.Column(db.Integer, db.ForeignKey('vehiculo.id_vehiculo'), nullable=False)
    fecha = db.Column(db.String(20), nullable=False)
    hora = db.Column(db.String(20), nullable=False)
    cliente = db.relationship('Cliente', backref=db.backref('turnos', lazy=True))
    vehiculo = db.relationship('Vehiculo', backref=db.backref('turnos', lazy=True))

# Crear la base de datos y las tablas
with app.app_context():
    db.create_all()

# Rutas CRUD
@app.route('/clientes', methods=['POST'])
def crear_cliente():
    data = request.json
    nuevo_cliente = Cliente(nombre=data['nombre'], email=data['email'], telefono=data['telefono'])
    db.session.add(nuevo_cliente)
    db.session.commit()
    return jsonify({'message': 'Cliente creado con éxito'}), 201

@app.route('/vehiculos', methods=['POST'])
def crear_vehiculo():
    data = request.json
    nuevo_vehiculo = Vehiculo(marca=data['marca'], modelo=data['modelo'], año=data['año'], precio=data['precio'])
    db.session.add(nuevo_vehiculo)
    db.session.commit()
    return jsonify({'message': 'Vehículo creado con éxito'}), 201

@app.route('/turnos', methods=['POST'])
def crear_turno():
    data = request.json
    nuevo_turno = Turno(id_cliente=data['id_cliente'], id_vehiculo=data['id_vehiculo'], fecha=data['fecha'], hora=data['hora'])
    db.session.add(nuevo_turno)
    db.session.commit()
    return jsonify({'message': 'Turno creado con éxito'}), 201

@app.route('/turnos', methods=['GET'])
def obtener_turnos():
    turnos = Turno.query.all()
    output = []
    for turno in turnos:
        turno_data = {'id_turno': turno.id_turno, 'id_cliente': turno.id_cliente, 'id_vehiculo': turno.id_vehiculo, 'fecha': turno.fecha, 'hora': turno.hora}
        output.append(turno_data)
    return jsonify({'turnos': output})

@app.route('/turnos/<id>', methods=['PUT'])
def actualizar_turno(id):
    data = request.json
    turno = Turno.query.get(id)
    if not turno:
        return jsonify({'message': 'Turno no encontrado'}), 404
    turno.id_cliente = data['id_cliente']
    turno.id_vehiculo = data['id_vehiculo']
    turno.fecha = data['fecha']
    turno.hora = data['hora']
    db.session.commit()
    return jsonify({'message': 'Turno actualizado con éxito'})

@app.route('/turnos/<id>', methods=['DELETE'])
def eliminar_turno(id):
    turno = Turno.query.get(id)
    if not turno:
        return jsonify({'message': 'Turno no encontrado'}), 404
    db.session.delete(turno)
    db.session.commit()
    return jsonify({'message': 'Turno eliminado con éxito'})

# Población de la base de datos con información demostrativa
def populate_tables(sender, **extra):
    if not Cliente.query.first():
        cliente1 = Cliente(nombre='Juan Perez', email='juan@example.com', telefono='123456789')
        cliente2 = Cliente(nombre='Maria Gomez', email='maria@example.com', telefono='987654321')
        db.session.add(cliente1)
        db.session.add(cliente2)
    
        vehiculo1 = Vehiculo(marca='Toyota', modelo='Corolla', año=2020, precio=20000)
        vehiculo2 = Vehiculo(marca='Honda', modelo='Civic', año=2021, precio=22000)
        db.session.add(vehiculo1)
        db.session.add(vehiculo2)
    
        turno1 = Turno(id_cliente=1, id_vehiculo=1, fecha='2024-07-25', hora='10:00')
        turno2 = Turno(id_cliente=2, id_vehiculo=2, fecha='2024-07-26', hora='11:00')
        db.session.add(turno1)
        db.session.add(turno2)
    
        db.session.commit()

# Conectar la señal `request_started` para poblar las tablas
request_started.connect(populate_tables, app)

if __name__ == '__main__':
    app.run(debug=True)
