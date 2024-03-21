import { Component,  computed,  effect,  signal } from '@angular/core';
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
import { ColorPickerModule } from 'primeng/colorpicker';
import _ from 'lodash';
import { ChipModule } from 'primeng/chip';
import hexRgb from 'hex-rgb';
import getRelativeLuminance from 'get-relative-luminance'


@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    AvatarModule , ChipModule,
    ColorPickerModule,
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

  color = signal<string>(['#dd0000' , '#00dd00' , '#0000dd'][_.random(2)])

  relativeLum = computed( () => {
    const rgb = hexRgb(this.color())
    return getRelativeLuminance(`rgb(${rgb.red}, ${rgb.green}, ${rgb.blue})`)
  })

  fontColor = computed( () => {
    const relativeLum = this.relativeLum()
    if (relativeLum > 0.179) {
      return '#000000' as const
    }
    return '#ffffff' as const 
  })


  bothColors = computed( () => {
    return {
      color: this.fontColor(),
      'background-color' : this.color()
    }
  }) 
  


  log({event, emoji} : {event: Event, emoji: any}) {
    this.marker.set(emoji.id)
  }
  
  onHide() {

    console.log(this.bothColors)
  }


  marker = signal<string>(this.defaultOptions[ _.random(0, this.defaultOptions.length - 1) ])

  name = signal('')

  firstLetter = computed( () => {
    return (this.name().length > 0) ? this.name()[0] : '-'
  })

}
