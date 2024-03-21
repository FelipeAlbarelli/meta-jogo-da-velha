import { Component,  signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { PrimeIcons, MenuItem } from 'primeng/api';
import { PickerComponent } from '@ctrl/ngx-emoji-mart';
import { ButtonModule } from 'primeng/button';
import { BrowserModule } from '@angular/platform-browser';
import { Emoji, EmojiComponent } from '@ctrl/ngx-emoji-mart/ngx-emoji';


@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    AvatarModule , 
    ButtonModule , OverlayPanelModule , EmojiComponent , CardModule , FormsModule, FloatLabelModule , InputTextModule, PickerComponent ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {

  readonly defaultOptions = [
    "+1",
    "heart_eyes",
    "dotted_line_face",
    "scream",
    "smiling_face_with_tear",
    "face_in_clouds",
    "mouse2"
  ] 

  log({event, emoji} : {event: Event, emoji: any}) {
    this.marker.set(emoji.id)
  }

  marker = signal<string>(this.defaultOptions[ Math.ceil(Math.random() * 7) ])

  name = signal('')

}
