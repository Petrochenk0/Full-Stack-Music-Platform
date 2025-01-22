import React from 'react';
import ReactDOM from 'react-dom/client';
import ContextProviderForAudio from './Context/Context';
import App from './App';
import { FavoritesProvider } from './Context/FavoritesContext';

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <FavoritesProvider>
        <ContextProviderForAudio>
          <App />
        </ContextProviderForAudio>
      </FavoritesProvider>
    </React.StrictMode>,
  );
}
