import React from 'react';
import { FolderOpen, Star, Clock, Share2, Trash2, Upload } from 'lucide-react';
import { useFiles } from '../context/FileContext';

const menuItems = [
  { id: 'root', icon: FolderOpen, label: 'My Files' },
  { id: 'starred', icon: Star, label: 'Starred' },
  { id: 'recent', icon: Clock, label: 'Recent' },
  { id: 'shared', icon: Share2, label: 'Shared' },
  { id: 'trash', icon: Trash2, label: 'Trash' },
];

export function Sidebar() {
  const { state, dispatch } = useFiles();

  const getItemCount = (id: string) => {
    switch (id) {
      case 'root':
        return state.files.filter(f => f.path === 'root').length;
      case 'starred':
        return state.files.filter(f => f.starred).length;
      case 'recent':
        return state.files.filter(f => 
          new Date(f.modified).getTime() > Date.now() - 7 * 24 * 60 * 60 * 1000
        ).length;
      case 'shared':
        return 0; // Implement shared functionality
      case 'trash':
        return 0; // Implement trash functionality
      default:
        return 0;
    }
  };

  const usedPercentage = (state.usedStorage / state.totalStorage) * 100;
  const usedGB = (state.usedStorage / (1024 * 1024 * 1024)).toFixed(1);
  const totalGB = (state.totalStorage / (1024 * 1024 * 1024)).toFixed(1);

  return (
    <aside className="w-64 bg-white/50 backdrop-blur-md border-r border-white/20 min-h-screen pt-16">
      <div className="p-4">
        <button className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-sky-500 to-blue-600 text-white py-2.5 px-4 rounded-lg hover:from-sky-600 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl">
          <Upload className="h-5 w-5" />
          <span>Upload Files</span>
        </button>
      </div>
      
      <nav className="mt-4">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => dispatch({ type: 'SET_FOLDER', payload: item.id })}
            className={`w-full flex items-center justify-between px-4 py-2 text-gray-700 hover:bg-white/50 ${
              state.currentFolder === item.id ? 'bg-white/50' : ''
            }`}
          >
            <div className="flex items-center gap-3">
              <item.icon className="h-5 w-5 text-gray-500" />
              <span>{item.label}</span>
            </div>
            <span className="text-sm text-gray-500">{getItemCount(item.id)}</span>
          </button>
        ))}
      </nav>
      
      <div className="p-4 mt-6">
        <div className="bg-gradient-to-br from-sky-100 to-blue-100 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-sky-800">Storage</span>
            <span className="text-xs text-sky-600">{usedPercentage.toFixed(1)}% used</span>
          </div>
          <div className="w-full bg-sky-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-sky-500 to-blue-600 h-2 rounded-full" 
              style={{ width: `${usedPercentage}%` }} 
            />
          </div>
          <p className="text-xs text-sky-600 mt-2">
            {usedGB} GB of {totalGB} GB used
          </p>
        </div>
      </div>
    </aside>
  );
}