import React, { useEffect } from 'react';
import { Layout } from './components/Layout';
import { FileGrid } from './components/FileGrid';
import { UploadZone } from './components/UploadZone';
import { FileProvider } from './context/FileContext';
import { useAuthStore } from './store/authStore';
import { Toaster } from 'react-hot-toast';

function App() {
  const { loadUser, user, subscription } = useAuthStore();

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <FileProvider>
      <Layout>
        <Toaster position="top-right" />
        <div className="pt-16">
          {user ? (
            <>
              <div className="mb-8">
                <h1 className="text-2xl font-semibold text-gray-900 mb-2">My Files</h1>
                <p className="text-gray-600">
                  {subscription === 'premium' 
                    ? 'Premium account: Enjoy 20GB storage and advanced features!' 
                    : 'Free account: 2GB storage available'}
                </p>
              </div>

              <div className="mb-8">
                <UploadZone />
              </div>

              <div className="mb-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Files</h2>
                <FileGrid />
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center min-h-screen -mt-16">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to SkyStoreX</h1>
              <p className="text-xl text-gray-600 mb-8">Sign in to start managing your files</p>
              <img 
                src="https://images.unsplash.com/photo-1606153694107-df52f9e01a83?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Cloud Storage" 
                className="rounded-lg shadow-xl max-w-2xl w-full"
              />
            </div>
          )}
        </div>
      </Layout>
    </FileProvider>
  );
}

export default App;