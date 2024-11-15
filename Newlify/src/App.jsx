import React from 'react';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { WalletProvider } from './context/WalletContext';
import MainApp from './components/MainApp';
import AuthForm from './components/AuthForm';
import { useAuth } from './context/AuthContext';

function AppContent() {
  const { user, login, register, logout } = useAuth();
  const [isLogin, setIsLogin] = useState(true);

  if (!user) {
    return (
      <div>
        <AuthForm 
          isLogin={isLogin} 
          onSubmit={isLogin ? login : register} 
        />
        <p className="text-center mt-4">
          {isLogin ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="ml-2 text-blue-500 hover:text-blue-600"
          >
            {isLogin ? 'Regístrate' : 'Inicia sesión'}
          </button>
        </p>
      </div>
    );
  }

  return <MainApp onLogout={logout} />;
}

export default function App() {
  return (
    <AuthProvider>
      <WalletProvider>
        <Toaster position="top-center" />
        <AppContent />
      </WalletProvider>
    </AuthProvider>
  );
}