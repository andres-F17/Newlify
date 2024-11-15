import React, { useState } from 'react';
import { X } from 'lucide-react';
import Button from './Button';

export default function TransactionModal({ isOpen, onClose, onSubmit, type }) {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [accountType, setAccountType] = useState('savings');
  const [toAccount, setToAccount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || !description) return;
    
    onSubmit({
      type,
      amount: Number(amount),
      description,
      accountType,
      toAccount: type === 'transfer' ? toAccount : null
    });
    
    setAmount('');
    setDescription('');
    setToAccount('');
    onClose();
  };

  if (!isOpen) return null;

  const titles = {
    deposit: 'Realizar depósito',
    withdrawal: 'Realizar retiro',
    transfer: 'Realizar transferencia'
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">{titles[type]}</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tipo de cuenta
            </label>
            <select
              value={accountType}
              onChange={(e) => setAccountType(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
            >
              <option value="savings">Cuenta de Ahorros</option>
              <option value="checking">Cuenta Corriente</option>
            </select>
          </div>

          {type === 'transfer' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cuenta destino
              </label>
              <input
                type="text"
                value={toAccount}
                onChange={(e) => setToAccount(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Número de cuenta destino"
                required
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Monto
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="0.00"
              min="0"
              step="0.01"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Descripción
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Ingrese una descripción"
              required
            />
          </div>

          <Button type="submit" className="w-full">
            Confirmar
          </Button>
        </form>
      </div>
    </div>
  );
}