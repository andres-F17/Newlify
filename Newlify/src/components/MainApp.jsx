import React, { useState } from 'react';
import { Bell, CreditCard, History, LogOut, Plus, Send, Wallet } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { walletService } from '../services/walletService';
import Button from './Button';
import Card from './Card';
import TransactionHistory from './TransactionHistory';
import TransactionModal from './TransactionModal';

export default function MainApp({ onLogout }) {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('movements');
  const [modalOpen, setModalOpen] = useState(false);
  const [transactionType, setTransactionType] = useState(null);

  const userCards = walletService.getUserCards(user.id);

  const handleActionClick = (type) => {
    setTransactionType(type);
    setModalOpen(true);
  };

  return (
    <div className="max-w-md mx-auto p-4 space-y-4">
      <Card>
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-xl font-bold">Bienvenido, {user.name}</h2>
            <p className="text-gray-500">Tu billetera digital</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline"><Bell size={20} /></Button>
            <Button variant="outline" onClick={onLogout}><LogOut size={20} /></Button>
          </div>
        </div>

        <div className="text-center mb-4">
          <p className="text-gray-500">Balance Disponible</p>
          <h2 className="text-4xl font-bold">${user.saldo.toFixed(2)}</h2>
        </div>

        <div className="grid grid-cols-4 gap-2">
          {[
            { icon: Send, label: "Enviar", action: () => handleActionClick('transfer') },
            { icon: Plus, label: "Recargar", action: () => handleActionClick('deposit') },
            { icon: CreditCard, label: "Pagar", action: () => handleActionClick('payment') },
            { icon: Wallet, label: "Retirar", action: () => handleActionClick('withdrawal') },
          ].map(({ icon: Icon, label, action }, index) => (
            <Button 
              key={index} 
              variant="outline" 
              className="flex flex-col items-center p-2"
              onClick={action}
            >
              <Icon size={20} />
              <span className="text-xs mt-1">{label}</span>
            </Button>
          ))}
        </div>
      </Card>

      <div>
        <div className="flex mb-4">
          <button
            className={`px-4 py-2 ${activeTab === 'movements' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setActiveTab('movements')}
          >
            Movimientos
          </button>
          <button
            className={`px-4 py-2 ${activeTab === 'cards' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setActiveTab('cards')}
          >
            Tarjetas
          </button>
        </div>

        {activeTab === 'movements' && <TransactionHistory />}

        {activeTab === 'cards' && (
          <Card>
            <h3 className="text-lg font-semibold mb-4">Mis Tarjetas</h3>
            <div className="space-y-4">
              {userCards.map((card) => (
                <div key={card.tarjeta_id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Tarjeta {card.tipo}</p>
                      <p className="text-gray-500">**** **** **** {card.numero_tarjeta.slice(-4)}</p>
                    </div>
                    <CreditCard size={24} className="text-blue-500" />
                  </div>
                  <p className="text-sm text-gray-500 mt-2">Expira: {card.fecha_expiracion}</p>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>

      <TransactionModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        type={transactionType}
      />
    </div>
  );
}