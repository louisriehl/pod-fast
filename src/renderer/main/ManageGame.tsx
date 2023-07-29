import React, { useEffect, useState } from 'react';
import { ReactElement } from 'react';

export function ManageGame(props: {players: string[]}): ReactElement {
  const min = 1;
  const max = 50;

  const [requiredTableCount, setRequiredTableCount] = useState(0);
  const [requestedTableCount, setRequestedTableCount] = useState(min);
  const [requestedSetTableCount, setRequestedSetTableCount] = useState(min);
  const [requestedFromTableCount, setRequestedFromTableCount] = useState(min);
  const [requestedToTableCount, setRequestedToTableCount] = useState(min);
  const [selectedTableOption, setSelectedTableOption] = useState('auto');

  function sendPlayers(event: any): void {
    event.stopPropagation();
    window.mainApi.sendPlayers(props.players);
  }

  function onRadioChange(event: any) {
    const value: 'auto' | 'set' | 'range' = event.target.value;
    switch (value) {
      case 'auto':
        setRequestedSetTableCount(1);
        setRequestedFromTableCount(1);
        setRequestedToTableCount(1);
        break;
      case 'range':
        setRequestedSetTableCount(1);
        setRequestedFromTableCount(1);
        setRequestedToTableCount(1);
        break;
      case 'set':
        setRequestedFromTableCount(1);
        setRequestedToTableCount(1);
        setRequestedSetTableCount(1);
        break;
    }
    setSelectedTableOption(event.target.value);
    setRequestedTableCount(1);
  }

  function onSetChange(event: any) {
    let value = event.target.value;
    if (value < min) {
      value = min;
    } else if (value > max) {
      value = max;
    }

    setRequestedSetTableCount(value);
    setRequestedTableCount(value);
  }

  function onRangeChange(event: any, pos: 'from' | 'to') {
    let value = Number(event.target.value);
    console.log(`range value ${pos} ${value}`);
    if (value < min) {
      value = min;
    } else if (value > max) {
      value = max;
    }

    if (value > requestedToTableCount && pos === 'from') {
      value = requestedToTableCount;
    }

    pos === 'from' ?
      setRequestedFromTableCount(value) :
      setRequestedToTableCount(value);

    if (pos === 'from') {
      setRequestedTableCount((requestedToTableCount - value) + 1);
    } else {
      setRequestedTableCount((value - requestedFromTableCount) + 1);
    }
  }

  useEffect(() => {
    const getTables = async () => {
      setRequiredTableCount(await window.mainApi.getTableCount(props.players) || 0);
    }

    getTables();
  });

  return (
    <div className='tab-element'>
      <h2>Table count options</h2>
      <div className="form-check mb-3">
        <input className="form-check-input" type="radio" value="set" onChange={(e) => onRadioChange(e)} checked={selectedTableOption === "set"}/>
          <label className="form-check-label mb-1" htmlFor="flexRadioDefault1">
            Set number of table numbers
          </label>
          <input type="number" style={{width: '70px'}} disabled={selectedTableOption !== "set"} onChange={(e) => onSetChange(e)} value={requestedSetTableCount} className="form-control col col-2" min={min} max={max} step={1}/>
      </div>
      <div className="form-check mb-3">
        <input className="form-check-input" type="radio" value="range" onChange={(e) => onRadioChange(e)} checked={selectedTableOption === "range"}/>
        <label className="form-check-label mb-1" htmlFor="flexRadioDefault1">
          Range of table numbers
        </label>
        <div className="input-group" style={{width: '180px'}}>
          <input type="number"  disabled={selectedTableOption !== "range"} onChange={(e) => onRangeChange(e, 'from')} value={requestedFromTableCount} className="form-control col col-2" min={min} max={max} step={1}/>
          <span className="input-group-text"> to </span>
          <input type="number" disabled={selectedTableOption !== "range"} onChange={(e) => onRangeChange(e, 'to')} value={requestedToTableCount} className="form-control col col-2" min={min} max={max} step={1}/>
        </div>
      </div>
      <div className="form-check mb-3">
        <input className="form-check-input" type="radio" value="auto" onChange={(e) => onRadioChange(e)} checked={selectedTableOption === "auto"}/>
          <label className="form-check-label" htmlFor="flexRadioDefault2">
            Auto ({requiredTableCount} tables)
          </label>
      </div>
      {
        (requiredTableCount > requestedTableCount && selectedTableOption !== 'auto') ?
          (<div className="alert alert-danger d-flex align-items-center" role="alert">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                 className="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" viewBox="0 0 16 16" role="img"
                 aria-label="Warning:">
              <path
                d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
            </svg>
                <div>
                  Need at least {requiredTableCount} tables for all players.
                </div>
          </div>) : null
      }
      {
        (props.players.length < 8) ?
          (<div className="alert alert-danger d-flex align-items-center" role="alert">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                 className="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" viewBox="0 0 16 16" role="img"
                 aria-label="Warning:">
              <path
                d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
            </svg>
            <div>
              Need at least 8 players.
            </div>
          </div>) : null
      }
      <button className='btn btn-primary' disabled={props.players.length === 0 || props.players.length < 8 || (requiredTableCount > requestedTableCount && selectedTableOption !== 'auto')} onClick={(e) => sendPlayers(e)}>Generate Pods</button>
    </div>

    
  )
}