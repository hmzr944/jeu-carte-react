# 🎴 Jeu de Memory - Module d'Apprentissage React

## 🎯 Objectif du Projet

Ce projet est conçu comme un **module d'apprentissage progressif** pour maîtriser React.js en créant un jeu de Memory (jeu de cartes à retourner). À la fin, vous serez capable de créer vos propres projets React de manière autonome !

---

## 📚 Table des Matières

1. [Concepts React Couverts](#-concepts-react-couverts)
2. [Installation et Démarrage](#-installation-et-démarrage)
3. [Structure du Projet](#-structure-du-projet)
4. [Guide d'Apprentissage](#-guide-dapprentissage)
5. [Exercices Pratiques](#-exercices-pratiques)
6. [Pour Aller Plus Loin](#-pour-aller-plus-loin)

---

## ✅ Concepts React Couverts

### Module 1 : Les Fondamentaux
- ✅ **Composants fonctionnels** : Créer des composants réutilisables
- ✅ **JSX** : Syntaxe JavaScript + HTML
- ✅ **Props** : Transmettre des données entre composants
- ✅ **Composition** : Assembler des composants pour créer une interface

### Module 2 : La Gestion d'État
- ✅ **useState** : Gérer des données qui changent
- ✅ **Événements** : Réagir aux actions utilisateur (onClick, etc.)
- ✅ **État immutable** : Modifier l'état correctement

### Module 3 : Les Effets
- ✅ **useEffect** : Exécuter du code à certains moments
- ✅ **Dépendances** : Contrôler quand useEffect s'exécute
- ✅ **Cleanup** : Nettoyer les effets secondaires

### Module 4 : Concepts Avancés
- ✅ **Rendu de listes** : Utiliser .map() avec key
- ✅ **Rendu conditionnel** : Afficher du contenu selon des conditions
- ✅ **Logique métier** : Implémenter la logique du jeu
- ✅ **Animations CSS** : Ajouter des transitions

---

## 🚀 Installation et Démarrage

### Prérequis
- Node.js installé (version 18+)
- Un éditeur de code (VS Code recommandé)

### Étapes

1. **Ouvrir le terminal dans ce dossier**

2. **Installer les dépendances** (si ce n'est pas déjà fait)
   ```bash
   npm install
   ```

3. **Démarrer le serveur de développement**
   ```bash
   npm run dev
   ```

4. **Ouvrir dans le navigateur**
   - L'application s'ouvre automatiquement
   - Sinon, aller à : `http://localhost:3000`

5. **Modifier le code**
   - Le navigateur se rafraîchit automatiquement (Hot Reload)
   - Testez en modifiant les fichiers !

---

## 📁 Structure du Projet

```
jeu-cartes-react/
│
├── src/
│   ├── main.jsx          # 🚪 Point d'entrée de l'application
│   ├── App.jsx           # 📦 Composant racine
│   ├── App.css           # 🎨 Styles de App
│   ├── Game.jsx          # 🎮 Logique du jeu (State + Effects)
│   ├── Game.css          # 🎨 Styles du jeu
│   ├── Card.jsx          # 🃏 Composant Carte (Props)
│   ├── Card.css          # 🎨 Styles des cartes
│   └── index.css         # 🌍 Styles globaux
│
├── public/               # Fichiers statiques
├── index.html            # Point d'entrée HTML
├── package.json          # Dépendances et scripts
└── vite.config.js        # Configuration Vite
```

---

## 📖 Guide d'Apprentissage

### Étape 1 : Comprendre le Point d'Entrée (main.jsx)

**Fichier à étudier : `src/main.jsx`**

Ce fichier est le point de départ. Il "monte" votre application React dans le DOM.

```jsx
// On sélectionne l'élément HTML avec id="root"
// On crée une racine React et on y rend <App />
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
```

**💡 À retenir :**
- React prend le contrôle de `<div id="root">`
- Tout commence par le composant `<App />`

---

### Étape 2 : Le Composant Racine (App.jsx)

**Fichier à étudier : `src/App.jsx`**

Le composant App est comme un conteneur. Il assemble d'autres composants.

```jsx
function App() {
  return (
    <div className="app">
      <Game />  {/* On utilise le composant Game */}
      <footer>...</footer>
    </div>
  );
}
```

**💡 À retenir :**
- Un composant = une fonction qui retourne du JSX
- On peut utiliser d'autres composants comme des balises HTML
- `className` au lieu de `class` (JSX n'est pas du HTML pur)

---

### Étape 3 : Les Props (Card.jsx)

**Fichier à étudier : `src/Card.jsx`**

Les props permettent de passer des données d'un parent vers un enfant.

```jsx
function Card({ card, onCardClick, isFlipped, isMatched }) {
  // "card", "onCardClick", etc. sont des props
  // On les reçoit comme paramètres de la fonction
  
  return (
    <div onClick={() => onCardClick(card)}>
      {card.emoji}
    </div>
  );
}
```

**💡 À retenir :**
- Les props sont en **lecture seule** (on ne peut pas les modifier)
- Destructuration : `{ prop1, prop2 }` au lieu de `props.prop1`
- On peut passer des fonctions en props

**🔍 Testez :**
1. Ouvrir `Card.jsx`
2. Ajouter un `console.log(card)` au début
3. Regarder dans la console du navigateur

---

### Étape 4 : Le State avec useState (Game.jsx)

**Fichier à étudier : `src/Game.jsx`**

Le state permet de stocker des données qui **changent** avec le temps.

```jsx
const [cards, setCards] = useState([]);
//     ↑      ↑            ↑
//  valeur  fonction    valeur initiale
//         pour changer
```

**💡 Règles importantes :**
1. **Ne JAMAIS modifier directement** : ❌ `cards.push(...)`
2. **Toujours utiliser la fonction set** : ✅ `setCards([...cards, newCard])`
3. **React re-rend automatiquement** quand le state change

**🔍 Testez :**
1. Ouvrir la console du navigateur
2. Taper : `console.log()` dans `handleCardClick`
3. Cliquer sur des cartes et observer

---

### Étape 5 : Les Effets avec useEffect (Game.jsx)

**Fichier à étudier : `src/Game.jsx`**

useEffect exécute du code à certains moments précis.

```jsx
useEffect(() => {
  // Ce code s'exécute...
  initializeGame();
}, []); // [] = seulement au montage
```

**Les 3 cas d'usage :**

1. **Au montage seulement** (début) :
   ```jsx
   useEffect(() => { /* code */ }, []);
   ```

2. **Quand une variable change** :
   ```jsx
   useEffect(() => { /* code */ }, [variable]);
   ```

3. **À chaque rendu** (rare) :
   ```jsx
   useEffect(() => { /* code */ });
   ```

**💡 À retenir :**
- Utilisé pour les effets secondaires (API, timers, etc.)
- Le tableau de dépendances contrôle quand ça s'exécute

---

### Étape 6 : Rendu de Listes (Game.jsx)

**Fichier à étudier : `src/Game.jsx`**

Pour afficher plusieurs éléments, on utilise `.map()`.

```jsx
{cards.map(card => (
  <Card
    key={card.id}  // ⚠️ KEY OBLIGATOIRE !
    card={card}
    // ... autres props
  />
))}
```

**💡 La prop `key` :**
- **Obligatoire** dans les listes
- Doit être **unique** et **stable**
- Aide React à optimiser le rendu
- ❌ Ne PAS utiliser l'index : `key={index}` (mauvaise pratique)

---

### Étape 7 : Rendu Conditionnel (Game.jsx)

**Fichier à étudier : `src/Game.jsx`**

Afficher du contenu selon des conditions.

```jsx
{/* Méthode 1 : Opérateur && */}
{gameWon && <div>Vous avez gagné !</div>}

{/* Méthode 2 : Ternaire */}
{isFlipped ? <span>😀</span> : <span>?</span>}
```

**💡 À retenir :**
- `&&` : affiche si la condition est vraie
- `? :` : affiche une chose OU une autre
- On peut aussi utiliser des variables

---

## 💪 Exercices Pratiques

### Niveau 1 : Débutant

#### Exercice 1 : Changer les Emojis
**Fichier : `Game.jsx`, ligne ~50**

Remplacer les emojis du jeu par vos favoris !

```jsx
const emojis = ['🎮', '🎯', '🎨', '🎭', '🎪', '🎸', '🎺', '🎹'];
// Remplacez par : ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼']
```

#### Exercice 2 : Changer les Couleurs
**Fichier : `Card.css`, ligne ~35**

Personnaliser les couleurs des cartes :

```css
.card-front {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  /* Essayez : #FF6B6B 0%, #4ECDC4 100% */
}
```

#### Exercice 3 : Afficher un Message
**Fichier : `Game.jsx`**

Ajouter un message quand le joueur fait plus de 20 coups :

```jsx
{moves > 20 && <p>⚠️ Vous faites beaucoup de tentatives !</p>}
```

---

### Niveau 2 : Intermédiaire

#### Exercice 4 : Ajouter un Chronomètre

1. **Créer un state pour le temps** :
   ```jsx
   const [seconds, setSeconds] = useState(0);
   ```

2. **Utiliser useEffect avec setInterval** :
   ```jsx
   useEffect(() => {
     const timer = setInterval(() => {
       setSeconds(s => s + 1);
     }, 1000);
     
     return () => clearInterval(timer); // Cleanup
   }, []);
   ```

3. **Afficher le temps** :
   ```jsx
   <p>Temps : {seconds}s</p>
   ```

#### Exercice 5 : Niveaux de Difficulté

Créer des boutons pour choisir le nombre de paires :

```jsx
const [difficulty, setDifficulty] = useState(8);

// Dans initializeGame, utiliser difficulty au lieu de 8
const emojis = allEmojis.slice(0, difficulty);

// Ajouter des boutons
<button onClick={() => setDifficulty(6)}>Facile</button>
<button onClick={() => setDifficulty(8)}>Moyen</button>
<button onClick={() => setDifficulty(10)}>Difficile</button>
```

#### Exercice 6 : Meilleur Score

Sauvegarder le meilleur score dans localStorage :

```jsx
// Charger le meilleur score
const [bestScore, setBestScore] = useState(() => {
  return parseInt(localStorage.getItem('bestScore')) || 999;
});

// Sauvegarder quand on gagne
useEffect(() => {
  if (gameWon && moves < bestScore) {
    setBestScore(moves);
    localStorage.setItem('bestScore', moves);
  }
}, [gameWon, moves, bestScore]);
```

---

### Niveau 3 : Avancé

#### Exercice 7 : Créer un Composant Bouton Réutilisable

```jsx
// Nouveau fichier : Button.jsx
function Button({ onClick, children, variant = 'primary' }) {
  return (
    <button 
      className={`btn btn-${variant}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

// Utilisation
<Button onClick={initializeGame} variant="primary">
  Nouvelle partie
</Button>
```

#### Exercice 8 : Animations Avancées

Ajouter une animation quand on trouve une paire :

```css
.card.matched {
  animation: matchFound 0.5s ease;
}

@keyframes matchFound {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.2) rotate(360deg); }
}
```

#### Exercice 9 : Mode Multijoueur Local

Ajouter un système de tour par tour pour 2 joueurs.

**Indices :**
- State pour le joueur actuel
- State pour les scores de chaque joueur
- Changer de joueur après 2 cartes retournées

---

## 🚀 Pour Aller Plus Loin

### Concepts React à Explorer Ensuite

1. **Custom Hooks** : Créer vos propres hooks
2. **Context API** : Partager des données globalement
3. **React Router** : Navigation entre pages
4. **Fetch API** : Récupérer des données depuis internet
5. **Formulaires** : Gérer les inputs utilisateur

### Ressources Recommandées

- 📖 [Documentation React Officielle](https://react.dev)
- 🎥 [React Crash Course](https://www.youtube.com/results?search_query=react+crash+course)
- 💻 [React Exercices Interactifs](https://react-tutorial.app)

### Idées de Projets Suivants

1. **Todo List** : Ajouter/Supprimer/Modifier des tâches
2. **Météo App** : Utiliser une API météo
3. **Quiz App** : Questions à choix multiples
4. **Blog Personnel** : Lire et créer des articles
5. **E-commerce Simple** : Panier d'achats

---

## 🎉 Félicitations !

Vous avez maintenant un projet React complet qui couvre tous les concepts fondamentaux ! 

### Checklist de Compétences Acquises

- [ ] Créer des composants fonctionnels
- [ ] Utiliser les props
- [ ] Gérer le state avec useState
- [ ] Utiliser useEffect
- [ ] Gérer les événements
- [ ] Rendre des listes
- [ ] Faire du rendu conditionnel
- [ ] Structurer un projet React
- [ ] Utiliser les CSS modules
- [ ] Débugger avec console.log

**Prochaine étape :** Créez votre propre projet de zéro ! 🚀

---

## 📞 Aide et Support

- **Problème d'installation ?** Vérifiez que Node.js est installé
- **Erreur dans le code ?** Regardez la console du navigateur (F12)
- **Questions ?** Lisez les commentaires dans le code source

**Bon apprentissage ! 💪**
