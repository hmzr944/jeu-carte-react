/* 
  ============================================
  📚 POINT D'ENTRÉE DE L'APPLICATION
  ============================================
  
  Ce fichier est le point d'entrée principal.
  Il "monte" notre application React dans le DOM.
*/

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

/* 
  📖 CONCEPT : Rendu de l'application
  
  1. On sélectionne l'élément HTML avec id="root"
  2. On crée une "racine" React dessus
  3. On rend notre composant App à l'intérieur
*/

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

/* 
  📖 React.StrictMode
  Active des vérifications supplémentaires en développement.
  Aide à trouver des bugs potentiels.
*/
