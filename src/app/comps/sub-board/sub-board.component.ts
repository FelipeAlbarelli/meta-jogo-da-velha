import { Component, inject, input, model } from '@angular/core';
import { GameService } from '../../game-logic/game.service';

@Component({
  selector: 'app-sub-board',
  standalone: true,
  imports: [],
  templateUrl: './sub-board.component.html',
  styleUrl: './sub-board.component.scss'
})
export class SubBoardComponent {

  gameS = inject(GameService);

  blackLines = input(false);
  id = input.required<number>();

  cells = [0,0,0,0,0,0,0,0,0]

  state = model<'1' | '2' | null>()

  

}
