import { Component, effect, signal } from '@angular/core';
import { BaseStudentDocItem, getDataJoao } from '../data/joao';
import { GameBoardComponent } from '../comps/game-board/game-board.component';
import { UserComponent } from '../comps/user/user.component';
type StudentDocItem = BaseStudentDocItem & {
  underAnalysis: boolean;
  readble: boolean;
  correctPlace: boolean;
  complete: boolean;
  allOk: boolean;
};

@Component({
  selector: 'app-assistente-dashboard',
  standalone: true,
  imports: [GameBoardComponent , UserComponent ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class AssistenteDashboardComponent {

}
