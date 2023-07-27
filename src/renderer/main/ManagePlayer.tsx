import React, { useState } from 'react';
import { ReactElement } from 'react';

export function ManagePlayer({players, setPlayers}): ReactElement {
  const [filter, setFilter] = useState('');
  type playerMapped = { [key: string]: string; };
  let playerMap: playerMapped[] = [];

  playerMap = players.map((player: string, index: number) => {
    return {
      [index]: player
    };
  });

  const playerList = playerMap
    .sort((a, b) => {
      return a[Object.keys(a)[0]].toLowerCase().localeCompare(b[Object.keys(b)[0]].toLowerCase());
    })
    .filter((playerMapped) => playerMapped[Object.keys(playerMapped)[0]].toLowerCase().includes(filter.toLowerCase()) || filter === '')
    .map((playerMapped) => {
      const index = Object.keys(playerMapped)[0];
      const playerName = playerMapped[index];
      console.log(`${playerName} index ${index}`);
      return (<li className="list-group-item" key={index}>
        <div className='player-list-item'>
          {playerName}
          <span className='span-link icon-cancel' onClick={e => removePlayer(index)}>&#10006;</span>
        </div>
      </li>)
    });

  function onFilterChange(event) {
    setFilter(event.target.value);
  }

  function removePlayer(index: string): void {
    const remainingPlayers = [...players];
    remainingPlayers.splice(Number(index), 1);
    setPlayers(remainingPlayers);
    setFilter('');
  }

  function clearPlayers(event): void {
    event.stopPropagation();
    setPlayers([]);
    setFilter('');
  }

  return (
    <div className='tab-element'>
      <div className='search-cancel'>
        <input style={{width:'50%'}}value={filter} type="text" className="form-control" placeholder="Search for player" onChange={(e) => onFilterChange(e)}/>
        <div>
          <button className='btn btn-outline-danger' onClick={(e) => clearPlayers(e)}>Clear players</button>
        </div>
      </div>
      <hr></hr>
      <div className="list-group">
        <ul>
          {playerList.length === 0 ? (<span style={{textAlign: 'center'}}>No players yet...</span>) : playerList}
        </ul>
      </div>
    </div>
  )
}