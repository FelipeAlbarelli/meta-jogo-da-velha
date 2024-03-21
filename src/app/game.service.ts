import { Injectable, signal } from '@angular/core';
import _ from 'lodash';
import {  Matrix } from 'ts-matrix';
import { BasePlayer,  newGameMachine } from './game';
import { createMachine, createActor } from 'xstate';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  player1 = signal<BasePlayer | null>(null)
  player2 = signal<BasePlayer | null>(null)


  startGame(player1 : BasePlayer , player2: BasePlayer ) {
    this.player1.set(player1)
    this.player2.set(player2)
    const machine = newGameMachine(this.player1()! , this.player2()! );
    const x = newGameMachine(player1 , player2).getInitialSnapshot
    const actor = createActor(machine)
    actor.start()
    actor.subscribe( x => {
      console.log(x)
    })
  }

}
