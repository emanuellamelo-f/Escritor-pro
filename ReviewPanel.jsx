// components/ReviewPanel.jsx
import React, { useState } from 'react';

export default function ReviewPanel({ editorText }) {
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState(null);

  const analyzeText = async () => {
    if (!editorText || editorText.length < 20) {
      alert('Por favor, escreva um texto um pouco mais longo para análise.');
      return;
    }

    setLoading(true);
    
    // Simulated analysis - in production, call your API here
    setTimeout(() => {
      const mockAnalysis = {
        literaryReview: 'Seu texto apresenta uma narrativa coerente com bom fluxo literário.',
        issues: [
          { type: 'Gramática', msg: 'Possível falta de vírgula', severity: 'low', fix: 'Adicionar vírgula após introdução' },
          { type: 'Estilo', msg: 'Repetição da palavra "estava"', severity: 'medium', fix: 'Substituir por sinônimo' }
        ],
        interconnection: 'Este capítulo conecta bem com a narrativa anterior, mantendo a progressão da trama.'
      };
      
      setAnalysis(mockAnalysis);
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="h-full overflow-y-auto p-6 bg-slate-50">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-800">Análise Literária Profunda</h2>
          <p className="text-slate-500">Gramática, coesão, vícios de linguagem e sintaxe.</p>
        </div>
        
        <button
          onClick={analyzeText}
          disabled={loading}
          className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-xl shadow-lg hover:bg-indigo-700 transition disabled:opacity-50 mb-6"
        >
          {loading ? 'Analisando...' : 'Iniciar Análise IA'}
        </button>

        <div className="space-y-4">
          {loading ? (
            <div className="loading-shimmer h-24 rounded-2xl"></div>
          ) : analysis ? (
            <>
              <div className="bg-indigo-600 p-6 rounded-2xl text-white shadow-lg">
                <h3 className="font-bold text-lg mb-2">Parecer do Editor</h3>
                <p className="text-indigo-100 text-sm">{analysis.literaryReview}</p>
              </div>
              
              {analysis.issues.map((issue, idx) => (
                <div key={idx} className="bg-white p-4 border border-slate-200 rounded-xl">
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-xs font-bold uppercase text-slate-500">{issue.type}</span>
                  </div>
                  <p className="text-sm font-medium mb-1">{issue.msg}</p>
                  <p className="text-xs italic text-slate-600">Sugestão: "{issue.fix}"</p>
                </div>
              ))}
            </>
          ) : (
            <div className="bg-white p-6 rounded-2xl border border-slate-200 text-center py-12 text-slate-400">
              Escreva algo no editor e clique em analisar para ver os resultados.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
