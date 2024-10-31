import React from 'react';
import { Cloud, Zap } from 'lucide-react';

export function Logo() {
  return (
    <div className="flex items-center gap-2 text-white">
      <div className="relative">
        <Cloud className="h-7 w-7" />
        <Zap className="h-3.5 w-3.5 absolute bottom-0 right-0 transform translate-x-1 -translate-y-1" />
      </div>
      <span className="text-xl font-semibold tracking-tight">SkyStoreX</span>
    </div>
  );
}