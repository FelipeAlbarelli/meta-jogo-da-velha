import { Injectable, OnInit, computed, effect, signal } from '@angular/core';
import _ from 'lodash';
import { BasePlayer } from './player.model';

// type BoardIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 ;


// opcao 1 de model
type BoardKey = `${number}-${number}`

type PlayerState =  1 | 2 | null

type BoardState = {
  [key in BoardKey]: PlayerState;
};

// opcao 2:
type BoardState2 = {
  [subBoard : number] : {
    [cell : number] : PlayerState
  }
}

const toggleState = (id: 1 | 2 | null) =>  {
  if (id == null) {
    return null
  }
  return id == 1 ? 2 : 1
}


@Injectable({
  providedIn: 'root'
})
export class GameService  {

  player1 = signal<BasePlayer | null>(null)
  player2 = signal<BasePlayer | null>(null)

  players = computed( () => ({
    1: this.player1(),
    2: this.player2(),
    'null' : null
  }))

  currentPlayerState = signal<{
    player : PlayerState,
    subBoardToPlay : 'all' | number,
  }>({
    player: null,
    subBoardToPlay: 'all'
  })


  currentPlayer = computed( () => {
    return this.players()[this.currentPlayerState().player ?? 'null']
  })


  boardState2 = signal<Partial<BoardState2>>({})

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

    this.currentPlayerState.set({
      player: 1,
      subBoardToPlay: 'all'
    })
  }


  makePlay(miniBoard: number , cell: number ) {

    console.log({miniBoard , cell})
    const miniBoardState = this.boardState2()[miniBoard] ?? {}
    const newMiniBoardState = {
      ...miniBoardState,
      [cell] : this.currentPlayerState().player
    }
    this.boardState2.update( prev => ({
      ...prev,
      [miniBoard] : newMiniBoardState
    }))

    this.currentPlayerState.update(prev => ({
      subBoardToPlay: cell,
      player : toggleState(prev.player) 
    }))

    console.log(this.currentPlayerState())
  }


  constructor() {
    const json = JSON.parse(localStorage.getItem('players') ?? '{}') as {
      player1 : BasePlayer | null,
      player2 : BasePlayer | null
    }
    const {player1 , player2} = json

    if (player1) {
      this.player1.set(player1)
    }
    if (player2) {
      this.player2.set(player2)
    }

    this.startGame()
  }



}
