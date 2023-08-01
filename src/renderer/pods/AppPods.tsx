import { createRoot } from 'react-dom/client';
import { ReactElement, useEffect, useState } from 'react';
import React from 'react';

export function AppPods(): ReactElement {
  const [pods, setPods] = useState([]);

  const tables = pods.map((pod: string[], index: number) => {
    return (
      <div key={index} className='table-block'>
        <h2 style={{marginBottom: '5px'}}>Table {index + 1}</h2>
        <div className="table">
          { (pod.map((name: string, subIndex: number) => {
            return (
                <p className="table-name" key={subIndex}>{name}</p>
            )
          }))}
        </div>
      </div>
    )
  })

  useEffect(() => {
    async function awaitPods() {
      await window.mainApi.onSendPods((_event, value) => {
        setPods(value);
      })
    }
    
    awaitPods();
  });

  return (
    <div style={{margin: '10px'}}>
      <div className='tables'>
        {tables}
      </div>
    </div>
  );
}

function render() {
  const domNode = document.getElementById('root');
  const root = createRoot(domNode);
  root.render(<AppPods />);
}

render();
