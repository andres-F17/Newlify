import { toast } from 'react-hot-toast';

class WalletService {
  constructor() {
    this.baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
  }

  async login(email, password) {
    try {
      const response = await fetch(`${this.baseUrl}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      
      if (!response.ok) throw new Error('Credenciales inválidas');
      
      const data = await response.json();
      return { success: true, user: data };
    } catch (error) {
      toast.error(error.message);
      return { success: false, message: error.message };
    }
  }

  async getCuentas(userId) {
    try {
      const response = await fetch(`${this.baseUrl}/cuentas/${userId}`);
      if (!response.ok) throw new Error('Error al obtener las cuentas');
      return await response.json();
    } catch (error) {
      toast.error(error.message);
      return [];
    }
  }

  async getTransacciones(cuentaId, filtros = {}) {
    const queryParams = new URLSearchParams(filtros).toString();
    try {
      const response = await fetch(`${this.baseUrl}/transacciones/${cuentaId}?${queryParams}`);
      if (!response.ok) throw new Error('Error al obtener las transacciones');
      return await response.json();
    } catch (error) {
      toast.error(error.message);
      return [];
    }
  }

  async realizarTransaccion(data) {
    try {
      const response = await fetch(`${this.baseUrl}/transacciones`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      
      if (!response.ok) throw new Error('Error al realizar la transacción');
      
      const result = await response.json();
      toast.success('Transacción realizada con éxito');
      return result;
    } catch (error) {
      toast.error(error.message);
      throw error;
    }
  }

  async getServicios() {
    try {
      const response = await fetch(`${this.baseUrl}/servicios`);
      if (!response.ok) throw new Error('Error al obtener los servicios');
      return await response.json();
    } catch (error) {
      toast.error(error.message);
      return [];
    }
  }

  async realizarCompra(data) {
    try {
      const response = await fetch(`${this.baseUrl}/compras`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      
      if (!response.ok) throw new Error('Error al realizar la compra');
      
      const result = await response.json();
      toast.success('Compra realizada con éxito');
      return result;
    } catch (error) {
      toast.error(error.message);
      throw error;
    }
  }
}