import React, { useState } from 'react';
import { ReactElement } from 'react';

export function ManagePlayer({players, setPlayers}): ReactElement {
  const [filter, setFilter] = useState('');

  // TODO: tired right now, figure out how to keep the original array after filtering
  const playerList = players
    .sort()
    .map((player, index) => {
      const isFiltered = player.toLowerCase().includes(filter.toLowerCase()) && filter !== '';
      console.log(`${player} isFiltered ${isFiltered}: ${filter}`);
      return (<li className="list-group-item" style={{display: isFiltered ? 'none' : 'block'}} key={index}>
        <div className='player-list-item'>
          {player}
          <span className='span-link icon-cancel' onClick={e => removePlayer(index)}>&#10006;</span>
        </div>
      </li>)
    });

  function onFilterChange(event) {
    setFilter(event.target.value);
  }

  function removePlayer(index: number): void {
    // deep clones array
    const remainingPlayers = [...players];
    remainingPlayers.splice(index, 1);
    setPlayers(remainingPlayers);
  }

  return (
    <div className='tab-element'>
      <div className='search-cancel'>
        <input style={{width:'50%'}}value={filter} type="text" className="form-control" placeholder="Search for player" onChange={(e) => onFilterChange(e)}/>
        <button className='btn btn-outline-danger'>Clear players</button>
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