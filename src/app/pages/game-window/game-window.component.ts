import { Component } from '@angular/core';
import { GameComponent } from "../../components/game/game.component";

@Component({
  selector: 'app-game-window',
  standalone: true,
  imports: [GameComponent],
  templateUrl: './game-window.component.html',
  styleUrl: './game-window.component.css'
})
export class GameWindowComponent {

}
