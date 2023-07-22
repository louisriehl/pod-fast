import { createRoot } from 'react-dom/client';
import { ReactElement } from 'react';
import React from 'react';

export function App(): ReactElement {
  return (
    <div>
      <p>Pods page!</p>
    </div>
  )
}

function render() {
  const domNode = document.getElementById('root');
  const root = createRoot(domNode);
  root.render(<App />);
}

render();
