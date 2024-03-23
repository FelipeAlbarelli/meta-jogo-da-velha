import { Injectable, OnInit, computed, effect, signal } from '@angular/core';
import _ from 'lodash';
import { BasePlayer } from './player.model';

@Injectable({
  providedIn: 'root'
})
export class GameService  {

  player1 = signal<BasePlayer | null>(null)
  player2 = signal<BasePlayer | null>(null)

  currentPlayer = signal<1 | 2 | null>(null)

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
    // return this.player1()?.ready && this.player2()?.ready
    return false
  } )

  startGame( ) {

    this.currentPlayer.set(1)
  }


  makePlay(miniBoard: number , cell: number ) {
    console.log({miniBoard, cell})
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
