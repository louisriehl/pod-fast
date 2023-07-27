import React, { useEffect, useState } from 'react';
import { ReactElement } from 'react';

export function ManageGame({players}): ReactElement {
  const [tableCount, setTableCount] = useState(0);
  const [selectedTableOption, setSelectedTableOption] = useState('auto');
  function sendPlayers(event: any): void {
    event.stopPropagation();
    window.mainApi.sendPlayers(players);
  }

  useEffect(() => {
    const getTables = async () => {
      setTableCount(await window.mainApi.getTableCount(players) || 0);
    }

    getTables();
  })

  return (
    <div className='tab-element'>
      <div className="form-check">
        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"/>
          <label className="form-check-label" htmlFor="flexRadioDefault1">
            Default radio
          </label>
      </div>
      <div className="form-check">
        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked/>
          <label className="form-check-label" htmlFor="flexRadioDefault2">
            Default checked radio
          </label>
      </div>
      <button className='btn btn-primary' disabled={players.length === 0} onClick={(e) => sendPlayers(e)}>Generate Pods</button>
    </div>

    
  )
}