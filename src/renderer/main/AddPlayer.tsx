/* eslint-disable indent */
import React from 'react';
import { ReactElement, useState } from 'react';

// TODO: add a warning when a duplicate player is detected
export function AddPlayer(props: {activePlayers: string[], setPlayers: any}): ReactElement {
  const [playerString, setPlayerString] = useState('');
  const [currentPlayers, setCurrentPlayers] = useState([]);

  function onChange(event: any): void {
    const value = event.target.value;
    setPlayerString(value);
    const currentPlayers: string[] = value
    .replace(/^\s*$(?:\r\n?|\n)/gm, '')
    .trim()
    .split('\n');

    setCurrentPlayers(currentPlayers);
  }

  function updatePlayers(event: React.MouseEvent<any, any>): void {
    event.stopPropagation();
    const newArray = props.activePlayers.concat(currentPlayers);
    console.log(newArray);
    props.setPlayers(newArray);
    setCurrentPlayers([]);
    setPlayerString('');
}

  return (
    <div className='tab-element'>
      <div style={{marginBottom: '1em'}}>
        <span>Paste list of players below with one player name per line</span>
      </div>
      <form>
        <textarea placeholder='Paste or type player names here' value={playerString} onChange={e => onChange(e)} className='player-input'/>
        <br></br>
        <div style={{margin: '1em 0'}}>
          <button type='button' onClick={e => updatePlayers(e)} className='btn btn-primary'>Submit player list</button>
          {
            currentPlayers.length !== 0 
            ? (<label style={{marginLeft: '5px', verticalAlign: 'middle'}}>{currentPlayers.length} player(s) to add</label>) 
            : (null)
          }
        </div>
      </form>
    </div>);
}