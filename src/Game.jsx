/* 
  ============================================
  📚 MODULE 2 : Les États (State) et Effets
  ============================================
  
  Le State permet de stocker des données qui changent.
  Quand le state change, React re-rend automatiquement !
*/

import { useState, useEffect } from 'react';
import Card from './Card';
import './Game.css';

function Game() {
  
  /* 
    📖 CONCEPT : useState
    useState crée une variable d'état.
    Syntaxe : const [valeur, fonctionPourChanger] = useState(valeurInitiale)
  */
  
  // Les cartes du jeu
  const [cards, setCards] = useState([]);
  
  // Les deux cartes actuellement sélectionnées
  const [flippedCards, setFlippedCards] = useState([]);
  
  // Les paires trouvées
  const [matchedPairs, setMatchedPairs] = useState([]);
  
  // Nombre de coups joués
  const [moves, setMoves] = useState(0);
  
  // Le jeu est-il terminé ?
  const [gameWon, setGameWon] = useState(false);
  
  // État du jeu : 'menu', 'options', 'leaderboard', 'playing'
  const [gameState, setGameState] = useState('menu');
  
  // Difficulté sélectionnée
  const [difficulty, setDifficulty] = useState('normal');
  
  // Paramètres
  const [settings, setSettings] = useState({
    sound: true,
    animations: true
  });
  
  // Tab actif du classement
  const [activeTab, setActiveTab] = useState('normal');
  
  // Meilleurs scores
  const [bestScores, setBestScores] = useState(() => {
    const saved = localStorage.getItem('memoryBestScores');
    return saved ? JSON.parse(saved) : {
      easy: [],
      normal: [],
      hard: []
    };
  });

  // Vérifie si toutes les paires sont trouvées
  useEffect(() => {
    if (matchedPairs.length > 0 && matchedPairs.length === cards.length / 2) {
      setGameWon(true);
      // Sauvegarder le score
      saveScore(difficulty, moves);
    }
  }, [matchedPairs, cards, difficulty, moves]);
  
  // Sauvegarder un score
  const saveScore = (diff, score) => {
    const newScores = { ...bestScores };
    newScores[diff] = [...(newScores[diff] || []), { score, date: new Date().toISOString() }]
      .sort((a, b) => a.score - b.score)
      .slice(0, 10); // Garder top 10
    setBestScores(newScores);
    localStorage.setItem('memoryBestScores', JSON.stringify(newScores));
  };

  /* 
    📖 CONCEPT : Fonctions dans les composants
    On peut définir des fonctions utiles dans le composant
  */
  
  // Initialise un nouveau jeu
  const initializeGame = (selectedDifficulty = difficulty) => {
    // Les icônes modernes pour le jeu
    const allIcons = [
      { icon: '◆', color: '#FF6B6B' },
      { icon: '●', color: '#4ECDC4' },
      { icon: '■', color: '#FFE66D' },
      { icon: '▲', color: '#95E1D3' },
      { icon: '★', color: '#F38181' },
      { icon: '✦', color: '#AA96DA' },
      { icon: '◉', color: '#FCBAD3' },
      { icon: '◈', color: '#A8E6CF' },
      { icon: '▼', color: '#FFB88C' },
      { icon: '◇', color: '#DE6FA1' },
      { icon: '▪', color: '#6C5CE7' },
      { icon: '▸', color: '#FD79A8' }
    ];
    
    // Nombre de paires selon la difficulté
    const pairCount = {
      easy: 6,
      normal: 8,
      hard: 12
    }[selectedDifficulty];
    
    const icons = allIcons.slice(0, pairCount);
    
    // Créer des paires : chaque icône 2 fois
    const gamePairs = icons.flatMap((iconData, index) => [
      { id: index * 2, icon: iconData.icon, color: iconData.color, pairId: index },
      { id: index * 2 + 1, icon: iconData.icon, color: iconData.color, pairId: index }
    ]);
    
    // Mélanger les cartes (algorithme Fisher-Yates)
    const shuffled = gamePairs.sort(() => Math.random() - 0.5);
    
    setCards(shuffled);
    setFlippedCards([]);
    setMatchedPairs([]);
    setMoves(0);
    setGameWon(false);
    setDifficulty(selectedDifficulty);
    setGameState('playing');
  };
  
  const backToMenu = () => {
    setGameState('menu');
    setCards([]);
    setFlippedCards([]);
    setMatchedPairs([]);
    setMoves(0);
    setGameWon(false);
  };

  // Gère le clic sur une carte
  const handleCardClick = (clickedCard) => {
    /* 
      📖 CONCEPT : Logique conditionnelle
      On vérifie plusieurs conditions avant d'agir
    */
    
    // Ne rien faire si on a déjà 2 cartes retournées
    if (flippedCards.length === 2) return;
    
    // Ne pas retourner la même carte 2 fois
    if (flippedCards.find(card => card.id === clickedCard.id)) return;

    // Ajouter la carte aux cartes retournées
    const newFlipped = [...flippedCards, clickedCard];
    setFlippedCards(newFlipped);

    // Si c'est la 2ème carte, vérifier si c'est une paire
    if (newFlipped.length === 2) {
      setMoves(moves + 1);
      checkForMatch(newFlipped);
    }
  };

  // Vérifie si deux cartes forment une paire
  const checkForMatch = (cards) => {
    const [card1, card2] = cards;
    
    if (card1.pairId === card2.pairId) {
      // C'est une paire ! Attendre que l'animation de retournement soit terminée
      setTimeout(() => {
        setMatchedPairs([...matchedPairs, card1.pairId]);
        setFlippedCards([]);
      }, 600); // Attendre la fin de l'animation de retournement
    } else {
      // Pas une paire, on les retourne après 1 seconde
      setTimeout(() => {
        setFlippedCards([]);
      }, 1000);
    }
  };

  /* 
    📖 CONCEPT : Rendu conditionnel
    On peut retourner différents JSX selon l'état
  */
  
  // Écran de menu
  if (gameState === 'menu') {
    return (
      <div className="menu-screen">
        <div className="menu-container">
          <div className="game-logo">
            <h1>MEMORY</h1>
            <p className="logo-subtitle">GAME</p>
          </div>
          
          <div className="menu-buttons">
            <button onClick={() => initializeGame(difficulty)} className="menu-btn primary">
              <span className="btn-icon">▶</span>
              <span className="btn-text">NOUVELLE PARTIE</span>
            </button>
            <button className="menu-btn secondary" onClick={() => setGameState('options')}>
              <span className="btn-icon">◉</span>
              <span className="btn-text">OPTIONS</span>
            </button>
            <button className="menu-btn secondary" onClick={() => setGameState('leaderboard')}>
              <span className="btn-icon">★</span>
              <span className="btn-text">CLASSEMENT</span>
            </button>
          </div>
          
          <div className="menu-footer">
            <p>Appuyez sur NOUVELLE PARTIE pour commencer</p>
          </div>
        </div>
      </div>
    );
  }
  
  // Écran d'options
  if (gameState === 'options') {
    return (
      <div className="options-screen">
        <div className="options-container">
          <h1>OPTIONS</h1>
          
          <div className="options-section">
            <h2>Difficulté</h2>
            <div className="difficulty-buttons">
              <button 
                className={`difficulty-btn ${difficulty === 'easy' ? 'active' : ''}`}
                onClick={() => setDifficulty('easy')}
              >
                <span className="diff-icon">◆</span>
                <span className="diff-name">FACILE</span>
                <span className="diff-desc">6 paires</span>
              </button>
              <button 
                className={`difficulty-btn ${difficulty === 'normal' ? 'active' : ''}`}
                onClick={() => setDifficulty('normal')}
              >
                <span className="diff-icon">■</span>
                <span className="diff-name">NORMAL</span>
                <span className="diff-desc">8 paires</span>
              </button>
              <button 
                className={`difficulty-btn ${difficulty === 'hard' ? 'active' : ''}`}
                onClick={() => setDifficulty('hard')}
              >
                <span className="diff-icon">★</span>
                <span className="diff-name">DIFFICILE</span>
                <span className="diff-desc">12 paires</span>
              </button>
            </div>
          </div>
          
          <div className="options-section">
            <h2>Paramètres</h2>
            <div className="settings-list">
              <div className="setting-item">
                <span className="setting-label">Son</span>
                <button 
                  className={`toggle-btn ${settings.sound ? 'active' : ''}`}
                  onClick={() => setSettings({...settings, sound: !settings.sound})}
                >
                  <span className="toggle-switch"></span>
                </button>
              </div>
              <div className="setting-item">
                <span className="setting-label">Animations</span>
                <button 
                  className={`toggle-btn ${settings.animations ? 'active' : ''}`}
                  onClick={() => setSettings({...settings, animations: !settings.animations})}
                >
                  <span className="toggle-switch"></span>
                </button>
              </div>
            </div>
          </div>
          
          <button onClick={() => setGameState('menu')} className="back-btn">
            ← Retour au menu
          </button>
        </div>
      </div>
    );
  }
  
  // Écran du classement
  if (gameState === 'leaderboard') {
    return (
      <div className="leaderboard-screen">
        <div className="leaderboard-container">
          <h1>CLASSEMENT</h1>
          
          <div className="leaderboard-tabs">
            <button 
              className={`tab-btn ${activeTab === 'easy' ? 'active' : ''}`}
              onClick={() => setActiveTab('easy')}
            >
              Facile
            </button>
            <button 
              className={`tab-btn ${activeTab === 'normal' ? 'active' : ''}`}
              onClick={() => setActiveTab('normal')}
            >
              Normal
            </button>
            <button 
              className={`tab-btn ${activeTab === 'hard' ? 'active' : ''}`}
              onClick={() => setActiveTab('hard')}
            >
              Difficile
            </button>
          </div>
          
          <div className="scores-list">
            {bestScores[activeTab]?.length > 0 ? (
              bestScores[activeTab].map((score, index) => (
                <div key={index} className="score-item">
                  <span className="score-rank">#{index + 1}</span>
                  <span className="score-value">{score.score} coups</span>
                  <span className="score-date">{new Date(score.date).toLocaleDateString()}</span>
                </div>
              ))
            ) : (
              <div className="no-scores">
                <p>Aucun score enregistré</p>
                <p className="no-scores-hint">Jouez une partie pour apparaître ici !</p>
              </div>
            )}
          </div>
          
          <button onClick={() => setGameState('menu')} className="back-btn">
            ← Retour au menu
          </button>
        </div>
      </div>
    );
  }
  
  // Écran de jeu
  return (
    <div className="playing-screen">
      <div className="game-header">
        <button onClick={backToMenu} className="btn-back">
          <span>← Menu</span>
        </button>
        <h1>MEMORY GAME</h1>
        <div className="game-stats">
          <div className="stat-item">
            <span className="stat-label">Coups</span>
            <span className="stat-value">{moves}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Paires</span>
            <span className="stat-value">{matchedPairs.length}/{cards.length / 2}</span>
          </div>
        </div>
      </div>
      
      <div className={`cards-grid difficulty-${difficulty}`}>
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            onCardClick={handleCardClick}
            isFlipped={flippedCards.find(c => c.id === card.id) !== undefined}
            isMatched={matchedPairs.includes(card.pairId)}
            color={card.color}
          />
        ))}
      </div>

      {gameWon && (
        <div className="victory-overlay">
          <div className="victory-message">
            <h2>VICTOIRE !</h2>
            <p className="victory-score">Vous avez gagné en {moves} coups !</p>
            <div className="victory-buttons">
              <button onClick={() => initializeGame(difficulty)} className="victory-btn primary">
                ▶ Rejouer
              </button>
              <button onClick={backToMenu} className="victory-btn secondary">
                ← Menu
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Game;
