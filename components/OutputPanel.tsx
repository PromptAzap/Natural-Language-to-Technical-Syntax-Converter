
import React, { useEffect, useRef } from 'react';
import { CopyIcon } from './icons/CopyIcon';

interface OutputPanelProps {
  text: string;
  isLoading: boolean;
  error: string | null;
}

export const OutputPanel: React.FC<OutputPanelProps> = ({ text, isLoading, error }) => {
    const [copied, setCopied] = React.useState(false);
    const codeRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if(copied) {
            const timer = setTimeout(() => setCopied(false), 2000);
            return () => clearTimeout(timer);
        }
    }, [copied]);

    const handleCopy = () => {
        if (codeRef.current) {
            navigator.clipboard.writeText(codeRef.current.innerText);
            setCopied(true);
        }
    };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center h-full">
            <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-t-transparent border-cyan-400 rounded-full animate-spin"></div>
                <p className="text-slate-400">... جاري التفكير</p>
            </div>
        </div>
      );
    }
    if (error) {
      return (
        <div className="flex items-center justify-center h-full">
            <div className="bg-red-900/50 border border-red-700 text-red-300 p-4 rounded-md">
                <p className="font-semibold">Error</p>
                <p>{error}</p>
            </div>
        </div>
      );
    }
    if (!text) {
      return <p className="text-slate-500 text-center p-8">ستظهر الصيغة التقنية هنا</p>;
    }
    return (
        <pre className="p-4 overflow-auto"><code ref={codeRef} className="text-emerald-300 font-mono text-sm whitespace-pre-wrap break-words">{text}</code></pre>
    );
  };

  return (
    <div className="bg-slate-800/50 rounded-lg shadow-lg flex flex-col h-full ring-1 ring-slate-700/50 relative">
      <div className="p-4 border-b border-slate-700/50 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-slate-300">الصيغة التقنية</h2>
        {text && !isLoading && !error && (
            <button onClick={handleCopy} className="text-slate-400 hover:text-cyan-400 transition-colors p-1 rounded-md">
                {copied ? 'Copied!' : <CopyIcon className="w-5 h-5" />}
            </button>
        )}
      </div>
      <div className="flex-grow min-h-[200px]">
        {renderContent()}
      </div>
    </div>
  );
};
