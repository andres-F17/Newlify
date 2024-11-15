import React, { createContext, useContext, useState, useEffect } from 'react';
import { WalletService } from '../services/walletService';
import { useAuth } from './AuthContext';

const WalletContext = createContext(null);
const walletService = new WalletService();

export function WalletProvider({ children }) {
  const { user } = useAuth();
  const [cuentas, setCuentas] = useState([]);
  const [transacciones, setTransacciones] = useState([]);
  const [servicios, setServicios] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      cargarCuentas();
      cargarServicios();
    }
  }, [user]);

  const cargarCuentas = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const data = await walletService.getCuentas(user.id_usuario);
      setCuentas(data);
    } catch (error) {
      console.error('Error al cargar cuentas:', error);
    } finally {
      setLoading(false);
    }
  };

  const cargarTransacciones = async (cuentaId, filtros) => {
    setLoading(true);
    try {
      const data = await walletService.getTransacciones(cuentaId, filtros);
      setTransacciones(data);
    } catch (error) {
      console.error('Error al cargar transacciones:', error);
    } finally {
      setLoading(false);
    }
  };

  const cargarServicios = async () => {
    try {
      const data = await walletService.getServicios();
      setServicios(data);
    } catch (error) {
      console.error('Error al cargar servicios:', error);
    }
  };

  const realizarTransaccion = async (datos) => {
    setLoading(true);
    try {
      await walletService.realizarTransaccion(datos);
      await cargarCuentas();
      await cargarTransacciones(datos.id_cuentas);
      return true;
    } catch (error) {
      console.error('Error al realizar transacción:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const realizarCompra = async (datos) => {
    setLoading(true);
    try {
      await walletService.realizarCompra(datos);
      await cargarCuentas();
      await cargarTransacciones(datos.id_cuentas);
      return true;
    } catch (error) {
      console.error('Error al realizar compra:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return (
    <WalletContext.Provider value={{
      cuentas,
      transacciones,
      servicios,
      loading,
      cargarTransacciones,
      realizarTransaccion,
      realizarCompra
    }}>
      {children}
    </WalletContext.Provider>
  );
}

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet debe usarse dentro de un WalletProvider');
  }
  return context;
};