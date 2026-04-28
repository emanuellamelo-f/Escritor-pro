// components/TranslationPanel.jsx
import React, { useState } from 'react';

export default function TranslationPanel({ editorText }) {
  const [targetLang, setTargetLang] = useState('inglês');
  const [translation, setTranslation] = useState('');
  const [loading, setLoading] = useState(false);

  const translateText = async () => {
    if (!editorText) {
      alert('Nada para traduzir.');
      return;
    }

    setLoading(true);
    setTranslation('');
    
    // Simulated translation - in production, call translation API
    setTimeout(() => {
      const mockTranslations = {
        'inglês': 'Once upon a time, in a distant land...',
        'espanhol': 'Érase una vez, en una tierra lejana...',
        'francês': 'Il était une fois, dans une terre lointaine...',
      };
      
      setTranslation(mockTranslations[targetLang] || 'Translation not available');
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="h-full overflow-y-auto p-6 bg-slate-50">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">Tradutor Multilíngue</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-600">Para qual idioma?</label>
            <select
              value={targetLang}
              onChange={(e) => setTargetLang(e.target.value)}
              className="w-full p-3 bg-white border border-slate-200 rounded-xl outline-none"
            >
              <option value="inglês">Inglês</option>
              <option value="espanhol">Espanhol</option>
              <option value="italiano">Italiano</option>
              <option value="francês">Francês</option>
              <option value="alemão">Alemão</option>
            </select>
          </div>
          <div className="flex items-end">
            <button
              onClick={translateText}
              disabled={loading}
              className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-xl hover:bg-indigo-700 transition disabled:opacity-50"
            >
              {loading ? 'Traduzindo...' : 'Traduzir Capítulo'}
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm min-h-[300px] text-slate-700 leading-relaxed">
          {loading ? (
            <div className="loading-shimmer h-40 rounded-xl"></div>
          ) : translation ? (
            translation
          ) : (
            'O resultado da tradução aparecerá aqui...'
          )}
        </div>
      </div>
    </div>
  );
}
