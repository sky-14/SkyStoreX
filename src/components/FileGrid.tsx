import React from 'react';
import { FileText, Image, Film, Music, MoreVertical, Star } from 'lucide-react';
import { useFiles } from '../context/FileContext';

const iconMap = {
  pdf: FileText,
  image: Image,
  video: Film,
  audio: Music,
};

export function FileGrid() {
  const { state, dispatch } = useFiles();
  
  const filteredFiles = state.files.filter(file => 
    file.name.toLowerCase().includes(state.searchQuery.toLowerCase()) &&
    file.path.startsWith(state.currentFolder)
  );

  const handleStar = (id: string) => {
    dispatch({ type: 'TOGGLE_STAR', payload: id });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {filteredFiles.map((file) => {
        const FileIcon = iconMap[file.type] || FileText;
        
        return (
          <div
            key={file.id}
            className="bg-white p-4 rounded-lg border border-gray-200 hover:border-blue-500 transition-colors group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-gray-50 rounded-lg group-hover:bg-blue-50">
                <FileIcon className="h-6 w-6 text-gray-600 group-hover:text-blue-600" />
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => handleStar(file.id)}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <Star 
                    className={`h-5 w-5 ${
                      file.starred ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'
                    }`} 
                  />
                </button>
                <button className="p-1 hover:bg-gray-100 rounded">
                  <MoreVertical className="h-5 w-5 text-gray-500" />
                </button>
              </div>
            </div>
            
            <h3 className="font-medium text-gray-900 mb-1 truncate">
              {file.name}
            </h3>
            
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>{file.size}</span>
              <span>{file.modified}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}