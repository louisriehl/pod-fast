import React, { useState } from 'react';
import { ReactElement } from 'react';

export function ManagePlayer({players, setPlayers}): ReactElement {
  const [filter, setFilter] = useState('');
  type playerMapped = { [key: string]: string; };
  let playerMap: playerMapped[] = [];

  const uniq = players
    .map((name) => {
      return {
        count: 1,
        name: name
      };
    })
    .reduce((result, b) => {
      result[b.name] = (result[b.name] || 0) + b.count;

      return result;
    }, {});

  const duplicates = Object.keys(uniq).filter((a) => uniq[a] > 1);

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
    <div className="tab-element">
      {
        duplicates.length !== 0 ?
          (<div className="alert alert-warning d-flex align-items-center" role="alert">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                 className="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" viewBox="0 0 16 16" role="img"
                 aria-label="Warning:">
              <path
                d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
            </svg>
            <div>
              Duplicate players: {duplicates.join(', ')}
            </div>
          </div>) : (null)
      }
      <div className="search-cancel">
        <input style={{ width: '50%' }} value={filter} type="text" className="form-control"
               placeholder="Search for player" onChange={(e) => onFilterChange(e)}/>
        <div>
          <button className="btn btn-outline-danger" onClick={(e) => clearPlayers(e)}>Clear players</button>
        </div>
      </div>
      <hr></hr>
      <div className="list-group">
        <ul>
          {playerList.length === 0 ? (<span style={{ textAlign: 'center' }}>No players yet...</span>) : playerList}
        </ul>
      </div>
    </div>
  );
}