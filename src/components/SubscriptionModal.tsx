import React from 'react';
import { X, Check } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import toast from 'react-hot-toast';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function SubscriptionModal({ isOpen, onClose }: Props) {
  const { upgradeSubscription } = useAuthStore();

  if (!isOpen) return null;

  const handleUpgrade = async () => {
    try {
      await upgradeSubscription();
      toast.success('Successfully upgraded to Premium!');
      onClose();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 w-full max-w-2xl relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <X className="h-5 w-5" />
        </button>

        <h2 className="text-2xl font-semibold mb-6 text-center">
          Choose Your Plan
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Free Plan */}
          <div className="border rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-2">Free</h3>
            <p className="text-gray-600 mb-4">Perfect for getting started</p>
            <p className="text-3xl font-bold mb-6">₹0/mo</p>
            
            <ul className="space-y-3 mb-6">
              <li className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                <span>2GB Storage</span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                <span>Basic File Sharing</span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                <span>Mobile Access</span>
              </li>
            </ul>

            <button
              className="w-full py-2 border-2 border-blue-600 text-blue-600 rounded-md hover:bg-blue-50"
              onClick={onClose}
            >
              Current Plan
            </button>
          </div>

          {/* Premium Plan */}
          <div className="border-2 border-blue-600 rounded-lg p-6 relative">
            <div className="absolute top-0 right-0 bg-blue-600 text-white px-3 py-1 text-sm rounded-bl-lg rounded-tr-lg">
              Popular
            </div>
            
            <h3 className="text-xl font-semibold mb-2">Premium</h3>
            <p className="text-gray-600 mb-4">For power users</p>
            <p className="text-3xl font-bold mb-6">₹100/mo</p>
            
            <ul className="space-y-3 mb-6">
              <li className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                <span>20GB Storage</span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                <span>Advanced File Sharing</span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                <span>Priority Support</span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                <span>No Ads</span>
              </li>
            </ul>

            <button
              className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              onClick={handleUpgrade}
            >
              Upgrade Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}