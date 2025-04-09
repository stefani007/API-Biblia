import React, { useState } from 'react';
import './App.css';
import backgroundImage from './background.png';

function App() {
  const [query, setQuery] = useState('john 3:16');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = () => {
    if (!query.trim()) return;
    setLoading(true);
    setError(null);

    fetch(`https://bible-api.com/${encodeURIComponent(query)}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
          setResult(null);
        } else {
          setResult(data);
        }
        setLoading(false);
      })
      .catch((err) => {
        setError("Erro ao buscar versículo.");
        setLoading(false);
      });
  };

  return (
    <div className="app" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="content">
        <h1>Buscar Versículo da Bíblia</h1>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          placeholder="Ex: João 3:16 ou Salmos 23:1"
        />
        <button onClick={handleSearch}>Buscar</button>
        {loading && <p>Carregando...</p>}
        {error && <p className="error">{error}</p>}
        {result && (
          <div className="verse">
            <p>{result.text}</p>
            <p><strong>{result.reference}</strong></p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;