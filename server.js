const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const HOST = 'localhost';

const server = http.createServer(async (req, res) => {
    // API proxy for OpenAI
    if (req.url === '/api/openai' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', async () => {
            try {
                const payload = JSON.parse(body || '{}');
                const OPENAI_KEY = process.env.OPENAI_API_KEY;
                // Build chat messages based on mode
                const { mode, text, target } = payload;
                let system = 'Você é um assistente de escrita que ajuda a revisar, corrigir e traduzir textos em Português.';

                // If no API key is set, return a simulated response so frontend can be tested offline.
                if (!OPENAI_KEY) {
                    if (mode === 'analysis') {
                        const analysis = {
                            summary: `Texto com ${text.split(/\s+/).filter(Boolean).length} palavras e ${text.length} caracteres.`,
                            score: 85,
                            recommendation: 'Reduza repetições e melhore pontuação.',
                            issues: [
                                { type: 'Gramática', msg: 'Erros menores de acentuação detectados', fix: 'Corrigir acentuação', severity: 'low' },
                                { type: 'Estilo', msg: 'Repetições frequentes de palavras', fix: 'Use sinônimos', severity: 'medium' }
                            ]
                        };
                        const mock = { choices: [{ message: { content: JSON.stringify(analysis) } }] };
                        res.writeHead(200, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify(mock));
                        return;
                    } else if (mode === 'translate') {
                        const translated = `[Simulated translation to ${target}] ${text.substring(0, 1000)}`;
                        const mock = { choices: [{ message: { content: translated } }] };
                        res.writeHead(200, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify(mock));
                        return;
                    }
                }

                // Real OpenAI call
                const fetchRes = await fetch('https://api.openai.com/v1/chat/completions', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${OPENAI_KEY}`
                    },
                    body: JSON.stringify({
                        model: 'gpt-3.5-turbo',
                        messages: [
                            { role: 'system', content: system },
                            { role: 'user', content: mode === 'analysis' ? `Analise o texto a seguir para gramática, ortografia, vícios de linguagem, coerência e sintaxe. Retorne um JSON com campos: summary, score, recommendation, issues: [{type,msg,fix,severity}]. Texto:\n\n${text}` : `Traduza o texto abaixo para ${target}. Mantenha o tom e as nuances. Retorne apenas o texto traduzido. Texto:\n\n${text}` }
                        ],
                        max_tokens: 1000,
                        temperature: 0.2
                    })
                });

                const data = await fetchRes.json();
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(data));
            } catch (err) {
                console.error('OpenAI proxy error', err);
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: String(err) }));
            }
        });
        return;
    }

    // serve static files below
    let filePath = req.url === '/' ? '/index.html' : req.url;
    filePath = path.join(__dirname, filePath);

    const ext = path.extname(filePath);
    let contentType = 'text/html';

    switch (ext) {
        case '.js':
            contentType = 'application/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.jpg':
            contentType = 'image/jpg';
            break;
    }

    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('<h1>404 - Arquivo não encontrado</h1>', 'utf-8');
            } else {
                res.writeHead(500);
                res.end('Erro no servidor', 'utf-8');
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(PORT, HOST, () => {
    console.log(`Servidor rodando em http://${HOST}:${PORT}/`);
    console.log(`Pressione Ctrl+C para parar o servidor`);
});
