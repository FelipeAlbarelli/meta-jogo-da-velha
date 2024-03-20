import { Component, signal } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { CardModule } from 'primeng/card';
@Component({
  selector: 'app-user',
  standalone: true,
  imports: [AvatarModule , CardModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {

  name = signal('')

}
