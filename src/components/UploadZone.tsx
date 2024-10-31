import React, { useCallback } from 'react';
import { Upload } from 'lucide-react';
import { useFiles } from '../context/FileContext';
import { FileItem } from '../types';

export function UploadZone() {
  const { dispatch } = useFiles();

  const handleFiles = useCallback((files: FileList | null) => {
    if (!files) return;

    const newFiles: FileItem[] = Array.from(files).map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      type: file.type.split('/')[0] as any,
      size: (file.size / (1024 * 1024)).toFixed(1) + ' MB',
      modified: new Date().toISOString().split('T')[0],
      starred: false,
      path: 'root',
    }));

    dispatch({ type: 'ADD_FILES', payload: newFiles });
  }, [dispatch]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  }, [handleFiles]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
  }, [handleFiles]);

  return (
    <div
      className="border-2 border-dashed border-gray-300 rounded-lg p-8 hover:border-blue-500 transition-colors"
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      <div className="flex flex-col items-center">
        <div className="p-4 bg-blue-50 rounded-full mb-4">
          <Upload className="h-8 w-8 text-blue-600" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Drop files to upload
        </h3>
        <p className="text-sm text-gray-500 mb-4">
          or click to select files from your computer
        </p>
        <label className="cursor-pointer">
          <input
            type="file"
            className="hidden"
            multiple
            onChange={handleChange}
          />
          <span className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
            Select Files
          </span>
        </label>
      </div>
    </div>
  );
}