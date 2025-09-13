
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { InputPanel } from './components/InputPanel';
import { OutputPanel } from './components/OutputPanel';
import { translateToTechnicalFormat } from './services/geminiService';

const App: React.FC = () => {
  const [inputText, setInputText] = useState<string>('');
  const [outputText, setOutputText] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleTranslate = useCallback(async () => {
    if (!inputText.trim() || isLoading) return;

    setIsLoading(true);
    setError(null);
    setOutputText('');

    try {
      const result = await translateToTechnicalFormat(inputText);
      setOutputText(result);
    } catch (e) {
      setError('An error occurred while communicating with the API. Please check the console and try again.');
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, [inputText, isLoading]);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 font-sans flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto p-4 md:p-8 flex flex-col lg:flex-row gap-8">
        <div className="lg:w-1/2 flex flex-col">
          <InputPanel
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onSubmit={handleTranslate}
            isLoading={isLoading}
          />
        </div>
        <div className="lg:w-1/2 flex flex-col">
          <OutputPanel
            text={outputText}
            isLoading={isLoading}
            error={error}
          />
        </div>
      </main>
      <footer className="text-center p-4 text-slate-500 text-sm">
        <p>Powered by Google Gemini</p>
      </footer>
    </div>
  );
};

export default App;
