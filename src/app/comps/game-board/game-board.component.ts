import { Component, inject, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { GameService } from '../../game.service';
import { ButtonGroupModule } from 'primeng/buttongroup';


@Component({
  selector: 'app-game-board',
  standalone: true,
  imports: [ButtonModule , ButtonGroupModule],
  templateUrl: './game-board.component.html',
  styleUrl: './game-board.component.scss'
})
export class GameBoardComponent {
  gameService = inject(GameService)


  startGame() {

  }

}
