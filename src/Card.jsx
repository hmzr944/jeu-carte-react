/* 
  ============================================
  📚 MODULE 1 : Les Composants React
  ============================================
  
  Un composant est une fonction qui retourne du JSX (HTML-like).
  C'est la base de React : tout est composant !
*/

import './Card.css';

/*
  Ce composant représente UNE carte du jeu.
  Il reçoit des "props" (propriétés) du parent.
*/
function Card({ card, onCardClick, isFlipped, isMatched, color }) {
  
  /* 
    📖 CONCEPT : Props
    Les props sont des données passées du parent vers l'enfant.
    Ici, on reçoit :
    - card : l'objet carte avec son icône
    - onCardClick : fonction pour gérer le clic
    - isFlipped : booléen - la carte est-elle retournée ?
    - isMatched : booléen - la carte est-elle trouvée ?
    - color : couleur de l'icône
  */

  // Fonction appelée au clic sur la carte
  const handleClick = () => {
    // On ne peut cliquer que si la carte n'est ni retournée ni trouvée
    if (!isFlipped && !isMatched) {
      onCardClick(card);
    }
  };

  return (
    <div 
      className={`card ${isFlipped ? 'flipped' : ''} ${isMatched ? 'matched' : ''}`}
      onClick={handleClick}
    >
      <div className="card-inner">
        <div className="card-front">
          <span className="card-pattern"></span>
        </div>
        <div className="card-back" style={{ color: color }}>
          <span className="card-icon">{card.icon}</span>
        </div>
      </div>
    </div>
  );
}

export default Card;
