import { Component, effect, signal } from '@angular/core';
import { BaseStudentDocItem, getDataJoao } from '../data/joao';
import { TableModule } from 'primeng/table';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
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
  imports: [TableModule, ToggleButtonModule, ButtonModule, FormsModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class AssistenteDashboardComponent {
  intialData: StudentDocItem[] = getDataJoao().map((item) => ({
    ...item,
    allOk: false,
    complete: false,
    correctPlace: false,
    readble: false,
    underAnalysis: false,
  }));

  colsToggleBtn = [
    {
      field: 'underAnalysis' as const,
      label: 'Analise',
      off: 'Em Análise',
      on: 'Analisado',
    },
    {
      field: 'readble' as const,
      label: 'Legível',
      off: 'Ilégivel',
      on: 'Legível',
    },
    {
      field: 'correctPlace' as const,
      label: 'Doc em Local Correto',
      off: 'Incorreto',
      on: 'Correto',
    },
    {
      field: 'complete' as const,
      label: 'Completo',
      on: 'Completo',
      off: 'Incompleto',
    },
  ];

  data = this.intialData;

  test(x: any) {
    console.log({ x });
  }

  btnPress(
    col: typeof this.colsToggleBtn[number]['field'],
    item: StudentDocItem
    // checked:
  ) {
    // const key = col as
    // console.log({ col, item });
    console.log(item[col]);
    if (col == 'readble' || col == 'complete' || col == 'correctPlace') {
      item.underAnalysis = true;
      return;
    }
  }

  allOk(item: StudentDocItem) {
    item.complete = true;
    item.readble = true;
    item.correctPlace = true;
    item.underAnalysis = true;
  }
}
