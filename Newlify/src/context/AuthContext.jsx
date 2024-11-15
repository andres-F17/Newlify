import React, { createContext, useContext, useState } from 'react';
import { toast } from 'react-hot-toast';
import { walletService } from '../services/walletService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = (credentials) => {
    const result = walletService.validateLogin(credentials.email, credentials.password);
    
    if (result.success) {
      const userData = {
        email: result.user.email,
        name: result.user.nombre,
        id: result.user.usuario_id,
        saldo: result.user.saldo
      };
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      toast.success('Inicio de sesión exitoso');
      return true;
    } else {
      toast.error('Credenciales inválidas');
      return false;
    }
  };

  const register = (userData) => {
    // En un caso real, aquí se enviaría la petición al backend
    toast.error('Registro temporalmente deshabilitado');
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    toast.success('Sesión cerrada');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
};