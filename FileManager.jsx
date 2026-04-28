// components/FileManager.jsx
import React, { useState } from 'react';

export default function FileManager({ editorText, onLoadFile }) {
  const [uploadProgress, setUploadProgress] = useState(null);
  const [fileName, setFileName] = useState('');

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setFileName(file.name);
    const sizeInMB = (file.size / (1024 * 1024)).toFixed(2);
    
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      
      if (progress >= 100) {
        clearInterval(interval);
        
        if (file.size < 5 * 1024 * 1024) {
          const reader = new FileReader();
          reader.onload = (e) => {
            onLoadFile(e.target.result);
            setTimeout(() => setUploadProgress(null), 1500);
          };
          reader.readAsText(file);
        } else {
          alert('Arquivo grande detectado. Processará upload para a nuvem.');
          setTimeout(() => setUploadProgress(null), 1500);
        }
      }
    }, 100);
  };

  const downloadDocument = () => {
    if (!editorText) {
      alert('O editor está vazio!');
      return;
    }

    const blob = new Blob([editorText], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'capitulo.txt';
    a.click();
    window.URL.revokeObjectURL(url);
    alert('Livro exportado!');
  };

  return (
    <div className="h-full overflow-y-auto p-6 bg-slate-50">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">Gestão de Documentos</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Upload */}
          <div className="bg-white p-8 rounded-3xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-center group hover:border-indigo-400 transition cursor-pointer relative">
            <input
              type="file"
              id="fileUpload"
              className="absolute inset-0 opacity-0 cursor-pointer"
              onChange={handleFileUpload}
            />
            <label htmlFor="fileUpload" className="w-full cursor-pointer flex flex-col items-center">
              <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition">
                📤
              </div>
              <h3 className="text-lg font-bold text-slate-800">Upload de Arquivo</h3>
              <p className="text-slate-400 text-sm mt-2">Suporta .txt, .md (Limite: 1GB)</p>
            </label>
          </div>

          {/* Download */}
          <div
            onClick={downloadDocument}
            className="bg-white p-8 rounded-3xl border border-slate-200 flex flex-col items-center justify-center text-center group hover:border-emerald-400 transition cursor-pointer"
          >
            <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition">
              📥
            </div>
            <h3 className="text-lg font-bold text-slate-800">Exportar Livro</h3>
            <p className="text-slate-400 text-sm mt-2">Baixe seu progresso em formato .txt</p>
          </div>
        </div>

        {uploadProgress !== null && (
          <div className="mt-6 bg-indigo-50 p-4 rounded-xl border border-indigo-100">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-bold text-indigo-700">{fileName}</span>
              <span className="text-xs text-indigo-500">{uploadProgress}%</span>
            </div>
            <div className="w-full bg-indigo-200 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-indigo-600 h-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
