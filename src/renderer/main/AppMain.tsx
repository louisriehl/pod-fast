import { createRoot } from 'react-dom/client';
import { ReactElement, useState } from 'react';
import React from 'react';
import { AddPlayer } from './AddPlayer';
import { ManagePlayer } from './ManagePlayer';
import { ManageGame } from './ManageGame';

export function AppMain(): ReactElement {
  const [activePlayers, setActivePlayers] = useState([]);
  const [activeTabs, setActiveTabs] = useState([true, false, false]);

  function handleSetActivePlayers(players: string[]) {
    setActivePlayers(players);
    activateTab(null, 1);
  }

  // quick and dirty
  function activateTab(event: any | null, index: number) {
    if (event) {
      event.stopPropagation();
    }
    switch (index) {
      case 0:
        setActiveTabs([true, false, false]);
        break;
      case 1:
        setActiveTabs([false, true, false]);
        break;
      case 2:
        setActiveTabs([false, false, true]);
        break;
    }
  }

  return (
    <div className="main-container">
      <ul className="nav nav-tabs" style={{justifyContent: 'space-between'}} id="myTab" role="tablist">
        <li className="nav-item">
          <a onClick={(e) => activateTab(e, 0)} className={'nav-link' + (activeTabs[0] ? ' active' : '')} id="add-tab" data-toggle="tab" href="#add" role="tab" aria-controls="add" aria-selected="true">Add Players</a>
        </li>
        <li className="nav-item">
          <a onClick={(e) => activateTab(e, 1)} className={'nav-link' + (activeTabs[1] ? ' active' : '')} id="manage-tab" data-toggle="tab" href="#manage" role="tab" aria-controls="manage" aria-selected="false">
            Manage Players
            <span style={{marginLeft: '5px'}} className="badge bg-primary">{activePlayers.length || 0 }</span>
          </a>
        </li>
        <li className="nav-item">
          <a onClick={(e) => activateTab(e, 2)} className={'nav-link' + (activeTabs[2] ? ' active' : '')} id="game-tab" data-toggle="tab" href="#game" role="tab" aria-controls="game" aria-selected="false">Manage Pods</a>
        </li>
      </ul>
      <div className="tab-content">
        <div className={'tab-pane' + (activeTabs[0] ? ' active' : '')} id="add" role="tabpanel" aria-labelledby="add-tab">
          <AddPlayer activePlayers={activePlayers} setPlayers={handleSetActivePlayers}/>
        </div>
        <div className={'tab-pane' + (activeTabs[1] ? ' active' : '')} id="manage" role="tabpanel" aria-labelledby="manage-tab">
          <ManagePlayer players={activePlayers} setPlayers={setActivePlayers} />
        </div>
        <div className={'tab-pane' + (activeTabs[2] ? ' active' : '')} id="game" role="tabpanel" aria-labelledby="game-tab">
          <ManageGame players={activePlayers} />
        </div>
      </div>
      
      
    </div>
  );
}

function render() {
  const domNode = document.getElementById('root');
  const root = createRoot(domNode);
  root.render(<AppMain />);
}

render();
