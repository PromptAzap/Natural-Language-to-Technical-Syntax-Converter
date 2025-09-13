
import React from 'react';
import { SparklesIcon } from './icons/SparklesIcon';
import { LoadingSpinnerIcon } from './icons/LoadingSpinnerIcon';

interface InputPanelProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

export const InputPanel: React.FC<InputPanelProps> = ({ value, onChange, onSubmit, isLoading }) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      onSubmit();
    }
  };

  return (
    <div className="bg-slate-800/50 rounded-lg shadow-lg flex flex-col h-full ring-1 ring-slate-700/50">
      <div className="p-4 border-b border-slate-700/50">
        <h2 className="text-lg font-semibold text-slate-300">الطلب باللغة الطبيعية</h2>
      </div>
      <div className="p-4 flex-grow flex flex-col">
        <textarea
          value={value}
          onChange={onChange}
          onKeyDown={handleKeyDown}
          placeholder="أدخل طلبك هنا... على سبيل المثال: 'اسلوب فكاهي مع رموز تعبيرية في الردود'"
          className="w-full flex-grow bg-slate-800 border border-slate-600 rounded-md p-3 text-slate-200 placeholder-slate-500 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-shadow duration-200 resize-none"
          rows={10}
          disabled={isLoading}
        />
      </div>
      <div className="p-4 border-t border-slate-700/50 flex justify-end items-center">
         <span className="text-xs text-slate-500 mr-4">Cmd/Ctrl + Enter to submit</span>
        <button
          onClick={onSubmit}
          disabled={isLoading || !value.trim()}
          className="px-6 py-2.5 bg-cyan-600 text-white font-semibold rounded-md hover:bg-cyan-500 disabled:bg-slate-600 disabled:cursor-not-allowed flex items-center gap-2 transition-all duration-200 shadow-md hover:shadow-cyan-500/30 disabled:shadow-none"
        >
          {isLoading ? (
            <>
              <LoadingSpinnerIcon className="w-5 h-5 animate-spin"/>
              جاري التحويل...
            </>
          ) : (
            <>
              <SparklesIcon className="w-5 h-5"/>
              تحويل
            </>
          )}
        </button>
      </div>
    </div>
  );
};
