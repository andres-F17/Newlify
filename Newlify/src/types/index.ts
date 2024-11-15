export interface Usuario {
  id_usuario: number;
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  direccion: string;
  fecha_registro: string;
}

export interface Cuenta {
  id_cuentas: number;
  id_usuario: number;
  saldo: number;
  estado: string;
}

export interface Transaccion {
  id_transacciones: number;
  id_compra: number | null;
  id_cuentas: number;
  id_tipo_transaccion: number;
  cuenta_destino: string | null;
  tipo_transaccion: string;
  monto: number;
  fecha_transaccion: string;
  ubicacion: string;
  metodo: string;
  descripcion: string;
}

export interface TipoTransaccion {
  id_tipo_transaccion: number;
  nombre: string;
}

export interface Compra {
  id_compra: number;
  id_servicios_detalle: number;
  monto: number;
  fecha_compra: string;
  descripcion: string;
}

export interface ServicioDetalle {
  id_servicios_detalle: number;
  id_producto: number;
  nombre_servicio: string;
}

export interface Producto {
  id_producto: number;
  id_tipo_servicio: number;
  id_proveedores: number;
  nombre: string;
  descripcion: string;
  valor: number;
}

export interface TipoServicio {
  id_tipo_servicio: number;
  nombre: string;
  descripcion: string;
}

export interface Proveedor {
  id_proveedores: number;
  nombre_provee: string;
}