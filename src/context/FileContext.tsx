import React, { createContext, useContext, useReducer } from 'react';
import { FileItem, FileState } from '../types';

type FileAction =
  | { type: 'ADD_FILES'; payload: FileItem[] }
  | { type: 'REMOVE_FILES'; payload: string[] }
  | { type: 'TOGGLE_STAR'; payload: string }
  | { type: 'SET_SEARCH'; payload: string }
  | { type: 'SET_FOLDER'; payload: string };

const initialState: FileState = {
  files: [],
  searchQuery: '',
  currentFolder: 'root',
  totalStorage: 20 * 1024 * 1024 * 1024, // 20GB
  usedStorage: 15.5 * 1024 * 1024 * 1024, // 15.5GB
};

function fileReducer(state: FileState, action: FileAction): FileState {
  switch (action.type) {
    case 'ADD_FILES':
      return {
        ...state,
        files: [...state.files, ...action.payload],
        usedStorage: state.usedStorage + action.payload.reduce((acc, file) => 
          acc + parseFloat(file.size) * 1024 * 1024, 0),
      };
    case 'REMOVE_FILES':
      const filesToRemove = state.files.filter(f => action.payload.includes(f.id));
      return {
        ...state,
        files: state.files.filter(f => !action.payload.includes(f.id)),
        usedStorage: state.usedStorage - filesToRemove.reduce((acc, file) => 
          acc + parseFloat(file.size) * 1024 * 1024, 0),
      };
    case 'TOGGLE_STAR':
      return {
        ...state,
        files: state.files.map(f =>
          f.id === action.payload ? { ...f, starred: !f.starred } : f
        ),
      };
    case 'SET_SEARCH':
      return { ...state, searchQuery: action.payload };
    case 'SET_FOLDER':
      return { ...state, currentFolder: action.payload };
    default:
      return state;
  }
}

const FileContext = createContext<{
  state: FileState;
  dispatch: React.Dispatch<FileAction>;
} | null>(null);

export function FileProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(fileReducer, initialState);

  return (
    <FileContext.Provider value={{ state, dispatch }}>
      {children}
    </FileContext.Provider>
  );
}

export function useFiles() {
  const context = useContext(FileContext);
  if (!context) {
    throw new Error('useFiles must be used within a FileProvider');
  }
  return context;
}