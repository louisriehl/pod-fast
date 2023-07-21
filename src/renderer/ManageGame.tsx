import React from 'react';
import { ReactElement } from 'react';

export function ManageGame(): ReactElement {
  const players: string[] = ['Valentin Gallegos',
    'Roy Rice',
    'Aryan Ball',
    'Ann Pruitt',
    'Beatrice Bush',
    'Abigail Snow',
    'Marquise Berg',
    'Valerie Bryan',
    'Bridger Gallegos',
    'Malachi Walton',
    'Shiloh Petty',
    'Adolfo Dudley',
    'Abdullah Leblanc',
    'Cristopher Copeland',
    'Kamren Mack',
    'Darien Montoya',
    'Emilie Boyer',
    'Jazlyn King',
    'Caroline Macdonald',
    'Caroline Riggs',
    'Ashlee Tucker',
    'Lea Tapia',
    'Aileen Pollard',
    'Eileen Baird',
    'Carly Barton',
    'Micah Hernandez',
    'Antonio Horn',
    'Dominik Norton',
    'Leila Dalton',
    'Ryan Walls',
    'Yazmin Lee',
    'Kaylie Rush',
    'Rose Hodges',
    'Judah Russell',
    'Darian Hampton',
    'Alia Salinas',
    'Sheldon Wyatt',
    'Georgia Yoder',
    'Bruno Hull',
    'Santino Andrade',
    'Konner Lowe',
    'Jackson King',
    'Dashawn Park',
    'Karson Ware',
    'Ismael Pruitt',
    'Joaquin Perry',
    'Tessa Love',
    'Nathanael Hale',
    'Issac Curtis',
    'Myles Medina',
    'Jair Stanton',
    'Alexia Obrien',
    'Frida Choi',
    'Juan Colon']
  let groups: any[][] = [];

  function splitIntoEqualGroups(array: any[], size: number): any[][] {
    const group: any[][] = []
    if (array.length < 2) {
      console.log('you need more friends...');
      return group;
    }
    
    for (let i = 0; i < players.length; i = i + size) {
      const lastPossibleItem = i + size > array.length - 1 ? array.length : i + size;
    
      console.log(`last possible item ${lastPossibleItem}`)
      group.push(array.slice(i,lastPossibleItem));
      console.log(`Remaining players: ${array.length - lastPossibleItem}`)
    }

    return group;
  }

  groups = splitIntoEqualGroups(players, 4);

  const lastGroupSize = groups[groups.length-1].length;
  console.log(lastGroupSize);

  if (lastGroupSize === 1) {
    // TODO better way for this
    const standouts: any[] = [...groups.pop(), ...groups.pop(), ...groups.pop()];
    console.log(JSON.stringify(standouts));
    groups.push(splitIntoEqualGroups(standouts, 3));
  }

  function sendPlayers(event: any): void {
    event.stopPropagation();
    window.mainApi.sendPlayers(players);
  }

  return (
    <div>
      <button className='btn btn-primary' onClick={(e) => sendPlayers(e)}>Generate Pods</button>
    </div>

    
  )
}