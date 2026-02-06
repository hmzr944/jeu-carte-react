/* 
  ============================================
  📚 COMPOSANT PRINCIPAL (App)
  ============================================
  
  C'est le composant racine de l'application.
  Tous les autres composants sont rendus à l'intérieur.
*/

import Game from './Game';
import './App.css';

function App() {
  return (
    <div className="app">
      <div className="app-container">
        {/* 
          📖 CONCEPT : Composition de composants
          On utilise le composant Game à l'intérieur d'App.
          C'est comme ça qu'on construit des interfaces complexes !
        */}
        <Game />
        
        <footer className="app-footer">
          <p>💡 <strong>Projet d'apprentissage React</strong></p>
          <p>Explorez le code pour comprendre les concepts !</p>
        </footer>
      </div>
    </div>
  );
}

export default App;

/* 
  ============================================
  📚 RÉSUMÉ DES CONCEPTS REACT UTILISÉS :
  ============================================
  
  ✅ Composants fonctionnels
  ✅ Props (transmission de données)
  ✅ State (données qui changent)
  ✅ Hooks (useState, useEffect)
  ✅ Gestion d'événements (onClick)
  ✅ Rendu conditionnel (&&, ternaire)
  ✅ Rendu de listes (.map + key)
  ✅ Composition de composants
  
  🎯 PROCHAINES ÉTAPES :
  - Personnalisez les emojis
  - Ajoutez un chronomètre
  - Créez des niveaux de difficulté
  - Ajoutez des sons
  - Sauvegardez les meilleurs scores
*/
