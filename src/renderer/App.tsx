import { createRoot } from 'react-dom/client';
import { ReactElement, useState } from 'react';
import React from 'react';
import { AddPlayer } from './AddPlayer';
import { ManagePlayer } from './ManagePlayer';

export function App(): ReactElement {
  const [activePlayers, setActivePlayers] = useState([]);

  return (
    <div className="main-container">
      <AddPlayer activePlayers={activePlayers} setPlayers={setActivePlayers}/>
      <ManagePlayer players={activePlayers} setPlayers={setActivePlayers} />
    </div>
  );
}

function render() {
  const domNode = document.getElementById('root');
  const root = createRoot(domNode);
  root.render(<App />);
}

render();
