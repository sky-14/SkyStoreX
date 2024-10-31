export interface FileItem {
  id: string;
  name: string;
  type: 'pdf' | 'image' | 'video' | 'audio' | 'other';
  size: string;
  modified: string;
  starred: boolean;
  path: string;
}

export interface FileState {
  files: FileItem[];
  searchQuery: string;
  currentFolder: string;
  totalStorage: number;
  usedStorage: number;
}