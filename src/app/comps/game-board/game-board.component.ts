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

  actor = signal<ReturnType<GameService['startGame']> | null>(null)

  startGame() {
    const actor = this.gameService.startGame()
    this.actor.set(actor)
    actor.subscribe( x => {
      // console.log(x.value)
    })
  }

}
