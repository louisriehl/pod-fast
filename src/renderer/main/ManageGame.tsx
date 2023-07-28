import React, { useEffect, useState } from 'react';
import { ReactElement } from 'react';

export function ManageGame({players}): ReactElement {
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
    window.mainApi.sendPlayers(players);
  }

  function onRadioChange(event) {
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

  function onSetChange(event) {
    let value = event.target.value;
    if (value < min) {
      value = min;
    } else if (value > max) {
      value = max;
    }

    setRequestedSetTableCount(value);
    setRequestedTableCount(value);
  }

  // TODO: need to properly calculate number of tables here (since state values dont update right away)
  function onRangeChange(event, pos: 'from' | 'to') {
    let value = event.target.value;
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
      setRequiredTableCount(await window.mainApi.getTableCount(players) || 0);
    }

    getTables();
  });

  return (
    <div className='tab-element'>
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
        requiredTableCount > requestedTableCount && selectedTableOption !== 'auto' ?
          (<div className="alert alert-warning" role="alert" style={{textAlign: 'center'}}>
            Not enough tables! Need at least {requiredTableCount} tables for all players.
          </div>) : null
      }
      <button className='btn btn-primary' disabled={players.length === 0 || (requiredTableCount > requestedTableCount && selectedTableOption !== 'auto')} onClick={(e) => sendPlayers(e)}>Generate Pods</button>
    </div>

    
  )
}