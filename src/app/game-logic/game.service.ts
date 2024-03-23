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

  currentPlayerState = signal<PlayerState>(null)
  currentPlayer = computed( () => {
    if (this.currentPlayerState() === 1) {
      return this.player1()
    }
    if (this.currentPlayerState() === 2) {
      return this.player2()
    }
    return null
  })


  boardState = signal<Partial<BoardState>>({})
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

    this.currentPlayerState.set(1)
  }


  makePlay(miniBoard: number , cell: number ) {
    this.boardState.update( prev => ({
      ...prev,
      [`${miniBoard}-${cell}`] : this.currentPlayerState(),
    
    }))
    const miniBoardState = this.boardState2()[miniBoard] ?? {}
    const newMiniBoardState = {
      ...miniBoardState,
      [cell] : this.currentPlayerState()
    }
    this.boardState2.update( prev => ({
      ...prev,
      [miniBoard] : newMiniBoardState
    }))

    this.currentPlayerState.update(toggleState)
    console.log({miniBoard, cell , curr: this.currentPlayerState()})
    console.log(this.boardState())
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

    this.startGame()
    console.log({player1 , player2})
  }



}
