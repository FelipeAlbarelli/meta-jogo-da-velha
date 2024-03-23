import { Component, inject, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { GameService } from '../../game-logic/game.service';
import { ButtonGroupModule } from 'primeng/buttongroup';
import { SubBoardComponent } from '../sub-board/sub-board.component';


@Component({
  selector: 'app-game-board',
  standalone: true,
  imports: [ButtonModule , ButtonGroupModule , SubBoardComponent],
  templateUrl: './game-board.component.html',
  styleUrl: './game-board.component.scss'
})
export class GameBoardComponent {
  gameService = inject(GameService)

  cells = [0,0,0,0,0,0,0,0,0]

  gameStarted = signal(true)

  startGame() {

  }

}
