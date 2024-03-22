import { Injectable, OnInit, computed, effect, signal } from '@angular/core';
import _ from 'lodash';
import {  Matrix } from 'ts-matrix';
import { BasePlayer,  newGameMachine } from './game';
import { createMachine, createActor } from 'xstate';

@Injectable({
  providedIn: 'root'
})
export class GameService  {

  player1 = signal<BasePlayer | null>(null)
  player2 = signal<BasePlayer | null>(null)

  saveEff = effect( () => {
    const player1 = this.player1();
    const player2 = this.player2();
    if (player1 === null && player2 === null) {
      return
    }
    const json = JSON.stringify({
      player1,
      player2
    })
    console.log({json})
    localStorage.setItem('players' , json)
  })

  bothReady = computed( () => {
    return this.player1()?.ready && this.player2()?.ready
  } )

  startGame( ) {
    if (!this.bothReady()) {
      console.error('nem todos estão prontos')
      throw new Error()
    }
    const machine = newGameMachine(this.player1()! , this.player2()! );
    const x = newGameMachine(this.player1()! , this.player2()! ).getInitialSnapshot
    const actor = createActor(machine)
    actor.subscribe(snap => {
      const value = snap.value;
      console.log(value)
      if (value == 'finished') {

      } else  if (value == 'off') {

      }else {
        const playing = value.playing!;
        if (playing == '1') {
          this.player1.update( (prev) => ({...prev! , myTurn: true}))
          this.player2.update( (prev) => ({...prev! , myTurn: false}))
        } else {
          this.player2.update( (prev) => ({...prev! , myTurn: true}))
          this.player1.update( (prev) => ({...prev! , myTurn: false}))
        }
      }
    })
    actor.start()
    return actor;
  }

  constructor() {
    const json = JSON.parse(localStorage.getItem('players') ?? '{}') as {
      player1 : BasePlayer | null,
      player2 : BasePlayer | null
    }
    const {player1 , player2} = json
    console.log({...json})
    if (player1) {
      this.player1.set(player1)
    }
    if (player2) {
      this.player2.set(player2)
    }
  }



}
