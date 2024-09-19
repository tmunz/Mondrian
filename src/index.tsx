import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';

import './index.styl';

const appElement = document.getElementById('app');
if (appElement) {
  createRoot(appElement).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
