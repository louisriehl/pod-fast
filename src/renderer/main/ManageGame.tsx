import React from 'react';
import { ReactElement } from 'react';

export function ManageGame(): ReactElement {
  const players: string[] = ['Valentin Gallegos',
    'Roy Rice SuperLongNamerson Mcgee',
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
    'Juan Colon'];

    
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