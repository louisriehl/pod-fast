import React from 'react';
import { ReactElement } from 'react';

export function ManagePlayer({players, setPlayers}): ReactElement {
  const playerList = players.sort().map((player, index) => 
  {
    return (<li className="list-group-item" key={index}>
      <div className='player-list-item'>
        {player}
        <span className='span-link' onClick={e => removePlayer(index)}>&#10006;</span>
      </div>
    </li>)});

  function removePlayer(index: number): void {
    // deep clones array
    const remainingPlayers = [...players];
    remainingPlayers.splice(index, 1);
    setPlayers(remainingPlayers);
  }

  return (
    <div>
      <p>Manage players</p>
      <p>I have {players.length || 0} players!</p>
      <ul className="list-group">
        {playerList}
      </ul>
    </div>
  )
}