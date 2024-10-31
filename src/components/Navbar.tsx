import React, { useState } from 'react';
import { Search, Bell, Settings, User, LogOut } from 'lucide-react';
import { Logo } from './Logo';
import { useFiles } from '../context/FileContext';
import { useAuthStore } from '../store/authStore';
import { AuthModal } from './AuthModal';
import { SubscriptionModal } from './SubscriptionModal';
import toast from 'react-hot-toast';

export function Navbar() {
  const { dispatch } = useFiles();
  const { user, subscription, signOut } = useAuthStore();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'SET_SEARCH', payload: e.target.value });
  };

  const handleSignOut = async () => {
    await signOut();
    toast.success('Signed out successfully');
  };

  return (
    <>
      <nav className="bg-gradient-to-r from-sky-500 to-blue-600 fixed w-full z-30">
        <div className="px-4 py-3 lg:px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center flex-1">
              <Logo />
              <div className="ml-8 flex-1 max-w-2xl">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="search"
                    placeholder="Search files and folders..."
                    onChange={handleSearch}
                    className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/30 focus:bg-white/20 text-white placeholder-white/70"
                  />
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              {user ? (
                <>
                  <button 
                    onClick={() => setShowSubscriptionModal(true)}
                    className={`px-3 py-1 rounded-full text-sm ${
                      subscription === 'premium' 
                        ? 'bg-yellow-400 text-yellow-900' 
                        : 'bg-white/10 text-white'
                    }`}
                  >
                    {subscription === 'premium' ? 'Premium' : 'Upgrade'}
                  </button>
                  <button className="p-2 hover:bg-white/10 rounded-full text-white">
                    <Bell className="h-5 w-5" />
                  </button>
                  <button className="p-2 hover:bg-white/10 rounded-full text-white">
                    <Settings className="h-5 w-5" />
                  </button>
                  <button 
                    onClick={handleSignOut}
                    className="p-2 hover:bg-white/10 rounded-full text-white"
                  >
                    <LogOut className="h-5 w-5" />
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="flex items-center gap-2 py-1 px-3 bg-white/10 hover:bg-white/20 rounded-lg text-white"
                >
                  <User className="h-5 w-5" />
                  <span className="text-sm font-medium">Sign In</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
      />
      
      <SubscriptionModal 
        isOpen={showSubscriptionModal} 
        onClose={() => setShowSubscriptionModal(false)} 
      />
    </>
  );
}