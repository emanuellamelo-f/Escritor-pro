// components/Editor.jsx
import React, { useState, useEffect } from 'react';

export default function Editor() {
  const [text, setText] = useState('');
  const [title, setTitle] = useState('');
  const [charCount, setCharCount] = useState(0);
  const [wordCount, setWordCount] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const chars = text.length;
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    
    setCharCount(chars);
    setWordCount(words);
    
    const goal = 1000;
    const percent = Math.min((words / goal) * 100, 100);
    setProgress(percent);
  }, [text]);

  return (
    <div className="h-full flex flex-col p-4 md:p-8">
      <div className="max-w-4xl mx-auto w-full h-full flex flex-col">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Título do Capítulo..."
          className="text-3xl font-bold text-slate-800 placeholder-slate-300 border-none outline-none mb-6"
        />
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="editor-font flex-1 w-full text-lg text-slate-700 leading-relaxed placeholder-slate-300 border-none outline-none resize-none custom-scrollbar"
          placeholder="Comece sua história aqui..."
        />
        <div className="mt-4 text-sm text-slate-500">
          {charCount} caracteres | {wordCount} palavras | Progresso: {progress.toFixed(1)}%
        </div>
      </div>
    </div>
  );
}
