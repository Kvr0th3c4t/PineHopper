import { Component, ElementRef, ViewChild, OnInit, OnDestroy } from '@angular/core';
import * as Phaser from 'phaser';

import { Boot } from '../../../gameAssets/game/scenes/Boot.js';
import { Preloader } from '../../../gameAssets/game/scenes/Preload.js';
import { MainMenu } from '../../../gameAssets/game/scenes/MainMenu.js';
import { Tutorial } from '../../../gameAssets/game/scenes/Tutorial.js';
import { Stage1 } from '../../../gameAssets/game/scenes/Stage1.js';
import { Stage2 } from '../../../gameAssets/game/scenes/Stage2.js';
import { FinalStage } from '../../../gameAssets/game/scenes/FinalStage.js';
import { Controls } from '../../../gameAssets/game/scenes/ControlsMenu.js';
import { Options } from '../../../gameAssets/game/scenes/Options.js';
import { Win } from '../../../gameAssets/game/scenes/Win.js';
import { Continue } from '../../../gameAssets/game/scenes/Continue.js';
import { Credits } from '../../../gameAssets/game/scenes/Credits.js';
import { GameOver } from '../../../gameAssets/game/scenes/GameOver.js';
import { config } from '../../../gameAssets/game/config.js';

@Component({
  selector: 'app-game',
  standalone: true, 
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent implements OnInit, OnDestroy {
  @ViewChild('gameContainer', { static: true }) gameContainer!: ElementRef;
  game: Phaser.Game | undefined;
  
  ngOnInit(): void {
    this.iniciarJuego();
  }
  
  iniciarJuego(): void {
    const gameConfig: Phaser.Types.Core.GameConfig = {
      ...config,
      parent: this.gameContainer.nativeElement,
      scene: [
        Boot,
        Preloader,
        MainMenu,
        Tutorial,
        Stage1,
        Stage2,
        FinalStage,
        Controls,
        Options,
        Win,
        Continue,
        Credits,
        GameOver
      ]
    };
    
    this.game = new Phaser.Game(gameConfig);
  }
  
  ngOnDestroy(): void {
    if (this.game) {
      this.game.destroy(true);
    }
  }
}
