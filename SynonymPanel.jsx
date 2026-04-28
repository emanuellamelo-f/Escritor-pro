// components/SynonymPanel.jsx
import React, { useState } from 'react';

export default function SynonymPanel() {
  const [word, setWord] = useState('');
  const [synonyms, setSynonyms] = useState([]);
  const [loading, setLoading] = useState(false);

  const findSynonyms = async () => {
    if (!word) return;

    setLoading(true);
    setSynonyms([]);
    
    // Simulated synonym search
    setTimeout(() => {
      const mockSynonyms = {
        'belo': ['lindo', 'formoso', 'esplêndido', 'magnífico', 'admirável', 'encantador'],
        'triste': ['melancólico', 'pesaroso', 'desconsolado', 'abatido', 'angustiado', 'infeliz'],
        'correr': ['apressar', 'disparar', 'galopar', 'precipitar', 'desfilar', 'escoar'],
      };
      
      setSynonyms(mockSynonyms[word.toLowerCase()] || ['Nenhum sinônimo encontrado']);
      setLoading(false);
    }, 1000);
  };

  const handleSelectSynonym = (syn) => {
    setWord(syn);
    alert(`Sinônimo "${syn}" pronto para uso.`);
  };

  return (
    <div className="h-full overflow-y-auto p-6 bg-slate-50">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">Sugestões de Vocabulário</h2>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm mb-6">
          <div className="flex gap-2">
            <input
              type="text"
              value={word}
              onChange={(e) => setWord(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && findSynonyms()}
              placeholder="Digite uma palavra para buscar sinônimos..."
              className="flex-1 p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none"
            />
            <button
              onClick={findSynonyms}
              disabled={loading}
              className="bg-indigo-600 text-white px-6 rounded-xl hover:bg-indigo-700 transition disabled:opacity-50"
            >
              {loading ? '...' : 'Buscar'}
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {loading ? (
            <div className="loading-shimmer h-12 w-full col-span-3 rounded-xl"></div>
          ) : synonyms.length > 0 ? (
            synonyms.map((syn, idx) => (
              <button
                key={idx}
                onClick={() => handleSelectSynonym(syn)}
                className="bg-white p-3 rounded-xl border border-slate-200 text-sm font-medium hover:border-indigo-500 hover:text-indigo-600 transition text-center"
              >
                {syn}
              </button>
            ))
          ) : (
            <p className="text-sm text-slate-400">Digite uma palavra para buscar</p>
          )}
        </div>
      </div>
    </div>
  );
}
