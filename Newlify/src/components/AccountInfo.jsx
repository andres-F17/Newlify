import React from 'react';
import { useWallet } from '../context/WalletContext';
import Card from './Card';

export default function AccountInfo({ type }) {
  const { getAccountBalance, getAccountNumber } = useWallet();
  const balance = getAccountBalance(type);
  const accountNumber = getAccountNumber(type);

  const titles = {
    savings: 'Cuenta de Ahorros',
    checking: 'Cuenta Corriente'
  };

  return (
    <Card>
      <h3 className="text-lg font-semibold mb-2">{titles[type]}</h3>
      <p className="text-sm text-gray-500 mb-1">Número de cuenta: {accountNumber}</p>
      <p className="text-2xl font-bold">${balance.toFixed(2)}</p>
    </Card>
  );
}