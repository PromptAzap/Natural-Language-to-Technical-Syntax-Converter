
import React from 'react';
import { MagicWandIcon } from './icons/MagicWandIcon';

export const Header: React.FC = () => {
  return (
    <header className="p-4 md:p-6 text-center border-b border-slate-700/50">
      <div className="flex items-center justify-center gap-3">
        <MagicWandIcon className="w-8 h-8 text-cyan-400" />
        <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-violet-500">
          Syntax Shaper
        </h1>
      </div>
      <p className="mt-2 text-slate-400">
        تحويل الطلبات النصية باللغة الطبيعية إلى صيغ تقنية دقيقة
      </p>
    </header>
  );
};
