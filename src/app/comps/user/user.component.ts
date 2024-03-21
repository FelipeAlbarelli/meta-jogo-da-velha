import { Component,  computed,  effect,  inject,  input,  model,  signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AvatarModule } from 'primeng/avatar';
import { ButtonGroupModule } from 'primeng/buttongroup';
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
import { GameService } from '../../game.service';
import { BasePlayer } from '../../game';


@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    AvatarModule , ChipModule,
    ButtonGroupModule,
    ColorPickerModule,
    ButtonModule , OverlayPanelModule , EmojiComponent , CardModule , FormsModule, FloatLabelModule , InputTextModule, PickerComponent ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {


  player = model.required<BasePlayer | null>()

  // playerFromForms = computed( () => {
  //   return {
  //     name: this.name(),
  //     color: this.color(),
  //     marker: this.marker()
  //   }
  // })

  updateModelEf = effect( () => {
    const player = this.player()
    if (player == null) {
      return
    }
    this.color.set(player.color)
    this.marker.set(player.marker)
    this.name.set(player.name)
  }, {allowSignalWrites: true})

  ready() {
    this.player.update( (base) => ({
      marker: this.marker(),
      name: this.name(),
      color: this.color(),
      ready: true}))
  }


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
  
  marker = signal<string>(this.defaultOptions[ _.random(0, this.defaultOptions.length - 1) ])

  name = signal('')

  firstLetter = computed( () => {
    return (this.name().length > 0) ? this.name()[0] : '-'
  })

}
