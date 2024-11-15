import React, { useState } from 'react';
import { format } from 'date-fns';
import { useAuth } from '../context/AuthContext';
import { walletService } from '../services/walletService';
import Card from './Card';

export default function TransactionHistory() {
  const { user } = useAuth();
  const [dateRange, setDateRange] = useState({
    start: '',
    end: new Date().toISOString().split('T')[0]
  });

  const transactions = walletService.getUserTransactions(user.id)
    .filter(t => {
      if (!dateRange.start && !dateRange.end) return true;
      const date = new Date(t.fecha);
      return (!dateRange.start || date >= new Date(dateRange.start)) &&
             (!dateRange.end || date <= new Date(dateRange.end));
    });

  const typeLabels = {
    compra: 'Compra',
    envio: 'Envío',
    recarga: 'Recarga',
    retiro: 'Retiro'
  };

  const getAmountColor = (tipo, monto) => {
    if (tipo === 'recarga') return 'text-green-600';
    if (tipo === 'retiro' || tipo === 'compra' || tipo === 'envio') return 'text-red-600';
    return 'text-gray-600';
  };

  return (
    <Card>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Movimientos</h3>
        <div className="flex gap-2">
          <input
            type="date"
            value={dateRange.start}
            onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
            className="px-2 py-1 border rounded"
          />
          <input
            type="date"
            value={dateRange.end}
            onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
            className="px-2 py-1 border rounded"
          />
        </div>
      </div>

      <div className="space-y-3">
        {transactions.map((transaction) => (
          <div 
            key={transaction.tipo + transaction.fecha}
            className="flex justify-between items-center border-b py-2 last:border-b-0"
          >
            <div>
              <p className="font-medium">
                {transaction.descripcion || `${typeLabels[transaction.tipo]} - ${transaction.metodo || ''}`}
              </p>
              <p className="text-sm text-gray-500">
                {format(new Date(transaction.fecha), 'dd/MM/yyyy HH:mm')}
              </p>
            </div>
            <p className={`font-medium ${getAmountColor(transaction.tipo, transaction.monto)}`}>
              {transaction.tipo === 'recarga' ? '+' : '-'}${Math.abs(transaction.monto).toFixed(2)}
            </p>
          </div>
        ))}
        {transactions.length === 0 && (
          <p className="text-center text-gray-500">No hay transacciones en este período</p>
        )}
      </div>
    </Card>
  );
}