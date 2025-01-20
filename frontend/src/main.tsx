import React from 'react';
import ReactDOM from 'react-dom/client';
import ContextProviderForAudio from './Context/Context';
import App from './App';

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <ContextProviderForAudio>
        <App />
      </ContextProviderForAudio>
    </React.StrictMode>,
  );
}
