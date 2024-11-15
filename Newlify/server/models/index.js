import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

// Usuario
const Usuario = sequelize.define('Usuario', {
  id_usuario: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  apellido: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true
  },
  telefono: DataTypes.STRING(20),
  direccion: DataTypes.STRING(200),
  fecha_registro: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'Usuario',
  timestamps: false
});

// Cuentas
const Cuentas = sequelize.define('Cuentas', {
  id_cuentas: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  saldo: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0
  },
  estado: {
    type: DataTypes.STRING(20),
    defaultValue: 'activo'
  }
}, {
  tableName: 'Cuentas',
  timestamps: false
});

// Tipo_transaccion
const TipoTransaccion = sequelize.define('TipoTransaccion', {
  id_tipo_transaccion: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING(50),
    allowNull: false
  }
}, {
  tableName: 'Tipo_transaccion',
  timestamps: false
});

// Transacciones
const Transacciones = sequelize.define('Transacciones', {
  id_transacciones: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  tipo_transaccion: DataTypes.STRING(50),
  monto: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  fecha_transaccion: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  ubicacion: DataTypes.STRING(100),
  metodo: DataTypes.STRING(50),
  descripcion: DataTypes.STRING(255)
}, {
  tableName: 'Transacciones',
  timestamps: false
});

// Definir relaciones
Usuario.hasMany(Cuentas, { foreignKey: 'id_usuario' });
Cuentas.belongsTo(Usuario, { foreignKey: 'id_usuario' });

Cuentas.hasMany(Transacciones, { foreignKey: 'id_cuentas' });
Transacciones.belongsTo(Cuentas, { foreignKey: 'id_cuentas' });

TipoTransaccion.hasMany(Transacciones, { foreignKey: 'id_tipo_transaccion' });
Transacciones.belongsTo(TipoTransaccion, { foreignKey: 'id_tipo_transaccion' });

// Exportar modelos
export {
  Usuario,
  Cuentas,
  TipoTransaccion,
  Transacciones
};