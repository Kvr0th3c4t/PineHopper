import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { GameWindowComponent } from './pages/game-window/game-window.component';
import { CharactersComponent } from './pages/characters/characters.component';
import { WorldsComponent } from './pages/worlds/worlds.component';
import { TrailerComponent } from './pages/trailer/trailer.component';

export const routes: Routes = [
    { path: "", pathMatch: "full", redirectTo: "home" },
    { path: "home", component: HomeComponent },
    { path: "characters", component: CharactersComponent },
    { path: "worlds", component: WorldsComponent },
    { path: "trailer", component: TrailerComponent },
    { path: "game", component: GameWindowComponent },
    { path: "**", redirectTo: "home" }
];
