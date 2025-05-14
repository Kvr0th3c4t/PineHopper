import { Injectable } from '@angular/core';
import { Ifeatures } from '../interfaces/ifeatures';

@Injectable({
  providedIn: 'root'
})
export class FeatureContentService {

  private arrFeatures: Ifeatures[];

  constructor() { 
    this.arrFeatures = [
      {
        title: "Personajes únicos",
        description: "Conoce y juega con docenas de conejos con personalidades únicas",
        icon: "logo.png"
      },
      {
        title: "Misiones divertidas",
        description: "Completa desafíos y misiones para desbloquear recompensas",
        icon: "assets/itemAnimation/pinneFeature.png"
      },
      {
        title: "Mundos Fascinantes",
        description: "Explora entornos mágicos llenos de secretos y sorpresas",
        icon: "assets/Backgrounds/BackHEL.png"
      }
    ];
  }

  getAll(): Ifeatures[]{
    return this.arrFeatures;
  }
}
