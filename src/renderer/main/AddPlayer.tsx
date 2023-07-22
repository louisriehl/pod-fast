/* eslint-disable indent */
import React from 'react';
import { ReactElement, useState } from 'react';

// TODO: add a warning when a duplicate player is detected
export function AddPlayer({activePlayers, setPlayers}): ReactElement {
  const playerString = '';
  const [currentPlayers, setCurrentPlayers] = useState([]);

  function onChange(event): void {
    const value = event.target.value;
    const currentPlayers: string[] = value
    .replace(/^\s*$(?:\r\n?|\n)/gm, '')
    .trim()
    .split('\n');

    // console.log(currentPlayers);
    setCurrentPlayers(currentPlayers);
  }

  function updatePlayers(event: React.MouseEvent<any, any>): void {
    event.stopPropagation();
    const newArray = activePlayers.concat(currentPlayers);
    console.log(newArray);
    setPlayers(newArray);
  }

  return (
    <div>
      <p>Paste list of players below with one player name per line</p>
      <form>
      <textarea name="myInput" onChange={e => onChange(e)} className='player-input'/>
      <button value={playerString} type='button' onClick={e => updatePlayers(e)} className='btn btn-primary'>Submit player list</button>
      {
        currentPlayers.length !== 0 
        ? (<label style={{marginLeft: '5px'}}>{currentPlayers.length} player(s) to add</label>) 
        : (<label style={{marginLeft: '5px'}}>No players yet!</label>)
      }
      </form>
    </div>);
}