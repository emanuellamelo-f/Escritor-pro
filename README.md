# Escritor Pro - Assistente Literário Inteligente

A professional literary assistant application built with HTML, CSS, JavaScript, and React. An intelligent platform for writers to edit, analyze, translate, and enhance their literary works.

## Features

- **📝 Editor**: Full-featured text editor with character and word count tracking
- **✨ Review Panel**: AI-powered literary analysis (grammar, style, coherence)
- **🌐 Translation**: Multi-language translation support
- **📚 Synonym Panel**: Vocabulary suggestions and synonym finder
- **📁 File Manager**: Upload and download your documents
- **📊 Progress Tracking**: Monitor your chapter writing progress toward goals

## Project Structure

```
escritor-pro/
├── index.html              # Main HTML file (vanilla version)
├── server.js              # Node.js HTTP server
├── package.json           # Project dependencies
├── README.md             # This file
└── components/           # React components
    ├── Editor.jsx
    ├── ReviewPanel.jsx
    ├── TranslationPanel.jsx
    ├── SynonymPanel.jsx
    └── FileManager.jsx
```

## Tech Stack

- **Frontend**: HTML5, Tailwind CSS, Lucide Icons
- **Runtime**: Node.js
- **JavaScript Framework**: React (component version available)
- **Styling**: Tailwind CSS for responsive design
- **Icons**: Lucide (8KB CDN)

## Getting Started

### Prerequisites
- Node.js 14+ installed
- npm or yarn

### Installation & Running

1. **Start the server**:
```bash
cd c:\Users\manu_\Downloads\OneDrive\Documentos\escritor-pro
node server.js
```

The server will start at `http://localhost:3000`

2. **Open in browser**:
   - Navigate to `http://localhost:3000`
   - Start using the application

### Alternative: Using npm

```bash
npm install
npm start
```

## Features in Detail

### Editor Tab
- Write your story/chapter in a beautiful serif font (Merriweather)
- Real-time character and word count
- Progress tracking toward 1000-word goal
- Accessible title input for chapter names

### Review Panel
- AI-powered literary analysis
- Grammar and syntax checking
- Style and coherence assessment
- Issue severity levels (low, medium, high)
- Quick-apply suggestions

### Translation Tab
- Translate your text to multiple languages (EN, ES, IT, FR, DE, PT-BR)
- Maintains authorial voice in translations
- Professional literary translation

### Synonym Panel
- Find contextual synonyms for any word
- Vocabulary enhancement suggestions
- One-click selection to replace words

### File Manager
- Upload .txt, .md files (up to 1GB)
- Visual upload progress indicator
- Download your work as .txt format
- Auto-load content into editor

## API Integration

For AI features (Analysis, Translation, Synonyms), integrate with:
- **Google Gemini API** (included in code)
- Or your preferred LLM provider

Set your API key in the code:
```javascript
const apiKey = "your-api-key-here";
```

## Customization

### Colors & Theme
Edit the color scheme in `index.html` or adjust Tailwind classes:
- Primary: `indigo-600`
- Accent: `emerald-600`
- Background: `slate-50`

### Goals & Limits
Modify in JavaScript:
```javascript
const goal = 1000; // Change word goal
const fileLimit = 5 * 1024 * 1024; // 5MB file limit
```

### Fonts
Currently using:
- **Body**: Inter (sans-serif)
- **Editor**: Merriweather (serif)

Change in CSS `@import` section.

## Performance

- **Lightweight**: ~50KB HTML + CSS/JS
- **CDN-based**: Tailwind and Lucide from CDN
- **Responsive**: Mobile, tablet, and desktop layouts
- **Smooth animations**: Hardware-accelerated transitions

## Browser Support

- Chrome/Chromium 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Development

### Adding New Features

1. Create new component in `components/` folder
2. Follow React functional component pattern
3. Use Tailwind CSS for styling
4. Add to App.jsx navigation

### Building for Production

1. Configure API endpoints
2. Add error handling and logging
3. Optimize assets
4. Deploy to your server/cloud platform

## Troubleshooting

### Server won't start
```bash
# Check if port 3000 is in use
netstat -ano | findstr :3000
# Kill the process and restart
```

### Missing icons
- Clear browser cache
- Check Lucide CDN availability
- Use alternative icon set

### API errors
- Verify API key is set
- Check CORS settings
- Review API rate limits

## License

MIT - Free to use and modify

## Support

For issues or feature requests, contact the development team.

---

**Happy Writing! ✍️**

Built with ❤️ for writers, by writers.
