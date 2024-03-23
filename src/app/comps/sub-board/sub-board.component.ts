import { Component, computed, inject, input, model } from '@angular/core';
import { GameService } from '../../game-logic/game.service';
import { EmojiComponent } from '@ctrl/ngx-emoji-mart/ngx-emoji';
import _ from 'lodash';

@Component({
  selector: 'app-sub-board',
  standalone: true,
  imports: [EmojiComponent],
  templateUrl: './sub-board.component.html',
  styleUrl: './sub-board.component.scss'
})
export class SubBoardComponent {

  gameS = inject(GameService);
  blackLines = input(false);
  id = input.required<number>();

  cells = [0,0,0,0,0,0,0,0,0]

  state = model<'1' | '2' | null>()

  myState = computed( () => {
    const state = this.gameS.boardState2()
    return state[this.id()]
    // const pairs = _.toPairs( state).filter( ([key , val]) => val != undefined )
  })

  log() {
    const state = this.gameS.boardState2()

    const myState = (this.myState())

    console.log({state, myState})
  }

}
