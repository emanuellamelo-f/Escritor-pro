// App.jsx
import React, { useState } from 'react';
import Editor from './components/Editor.jsx';
import ReviewPanel from './components/ReviewPanel.jsx';
import TranslationPanel from './components/TranslationPanel.jsx';
import SynonymPanel from './components/SynonymPanel.jsx';
import FileManager from './components/FileManager.jsx';

export default function App() {
  const [currentTab, setCurrentTab] = useState('editor');
  const [editorText, setEditorText] = useState('');

  const tabs = [
    { id: 'editor', label: 'Editor', icon: '📄', component: Editor },
    { id: 'review', label: 'Revisão', icon: '✨', component: ReviewPanel },
    { id: 'translate', label: 'Tradução', icon: '🌐', component: TranslationPanel },
    { id: 'synonyms', label: 'Sinônimos', icon: '📚', component: SynonymPanel },
    { id: 'files', label: 'Arquivos', icon: '📁', component: FileManager },
  ];

  const CurrentComponent = tabs.find(t => t.id === currentTab)?.component;

  return (
    <div className="h-screen overflow-hidden flex flex-col bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between z-10">
        <div className="flex items-center gap-2">
          <div className="bg-indigo-600 p-1.5 rounded-lg text-white text-xl">✍️</div>
          <h1 className="text-xl font-bold text-slate-800 tracking-tight">
            Escritor <span className="text-indigo-600">Pro</span>
          </h1>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-4 text-sm text-slate-500 border-r pr-4">
            <span><strong id="charCount">0</strong> caracteres</span>
            <span><strong id="wordCount">0</strong> palavras</span>
          </div>
          <button
            onClick={() => setCurrentTab('files')}
            className="flex items-center gap-2 px-3 py-1.5 text-slate-600 hover:bg-slate-100 rounded-md transition"
          >
            📁 <span className="text-sm font-medium">Arquivos</span>
          </button>
        </div>
      </header>

      <main className="flex-1 flex overflow-hidden">
        {/* Sidebar Navigation */}
        <nav className="w-16 md:w-20 bg-white border-r border-slate-200 flex flex-col items-center py-6 gap-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setCurrentTab(tab.id)}
              className="group"
              title={tab.label}
            >
              <div
                className={`p-3 rounded-xl transition-all ${
                  currentTab === tab.id
                    ? 'bg-indigo-50 text-indigo-600 text-xl'
                    : 'text-slate-400 hover:bg-slate-50 hover:text-indigo-600 text-xl'
                }`}
              >
                {tab.icon}
              </div>
            </button>
          ))}
        </nav>

        {/* Main Content */}
        <section className="flex-1 flex flex-col bg-white overflow-hidden">
          {CurrentComponent && (
            <CurrentComponent
              editorText={editorText}
              onLoadFile={(content) => setEditorText(content)}
            />
          )}
        </section>

        {/* Right Panel */}
        <aside className="hidden lg:flex w-80 bg-slate-50 border-l border-slate-200 p-6 flex-col gap-6">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
            <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">
              Progresso do Capítulo
            </h4>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div id="progressFill" className="bg-indigo-500 h-full transition-all" style={{ width: '0%' }}></div>
            </div>
            <p id="progressText" className="text-xs text-slate-500 mt-2">Meta: 1000 palavras</p>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
            <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Interligação</h4>
            <p className="text-xs text-slate-500 leading-relaxed italic">
              A IA analisará como este capítulo se conecta com os anteriores conforme você escreve.
            </p>
          </div>

          <div className="flex-1 flex flex-col justify-end">
            <div className="p-4 bg-indigo-900 rounded-2xl text-white">
              <h5 className="font-bold mb-1">💡 Dica Pro</h5>
              <p className="text-xs text-indigo-200">
                Use a aba de tradução para verificar como sua narrativa soa em outros mercados literários.
              </p>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}
