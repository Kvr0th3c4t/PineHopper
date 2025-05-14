import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, OnInit, AfterViewInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { register } from 'swiper/element/bundle';

interface Character {
  name: string;
  description: string;
}

@Component({
  selector: 'app-swipper-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './swipper-card.component.html',
  styleUrl: './swipper-card.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SwipperCardComponent implements OnInit, AfterViewInit {
  @ViewChild('swiper') swiperElement!: ElementRef;
  
  characters: Character[] = [
    {
      name: 'PINEHOPPER',
      description: 'El protagonista principal del juego. Un aventurero valiente con la habilidad de saltar grandes distancias y una afinidad especial con las piñas.Su objetivo es salvar su mundo de las fuerzas oscuras que lo amenazan.'
    },
    {
      name: 'SLIME',
      description: 'Una criatura gelatinosa y amigable que puede cambiar de forma. A pesar de su apariencia suave, es sorprendentemente resistente y puede escurrirse por espacios pequeños. Es un aliado leal de Pinehopper en su aventura.'
    },
    {
      name: 'MACE',
      description: 'Un guerrero formidable equipado con un mazo gigante. Su fuerza bruta es legendaria y puede destrozar obstáculos con facilidad. Aunque intimidante en apariencia, tiene un gran corazón y protege a sus amigos.'
    },
    {
      name: 'THE BOSS',
      description: 'El antagonista principal del juego. Un ser misterioso con poderes oscuros que amenaza con sumir el mundo en el caos. Su verdadera motivación y origen son un misterio que Pinehopper deberá descubrir.'
    }
  ];
  
  currentCharacterIndex = 0;
  currentCharacterName = '';
  currentCharacterDescription = '';

  constructor() { }

  ngOnInit(): void {
    register();
    this.updateCharacterDescription(0);
  }

  ngAfterViewInit(): void {

    //Configuración de swiper
    const swiperParams = {
      effect: 'cards',
      initialSlide: 0,
      on: {
        slideChange: (swiper: any) => {
          this.updateCharacterDescription(swiper.activeIndex);
        }
      }
    };

    Object.assign(this.swiperElement.nativeElement, swiperParams);
    this.swiperElement.nativeElement.initialize();
  }
  
  updateCharacterDescription(index: number): void {
    this.currentCharacterIndex = index;
    const character = this.characters[index];
    this.currentCharacterName = character.name;
    this.currentCharacterDescription = character.description;
    
    const descriptionElement = document.getElementById('character-description');
    if (descriptionElement) {
      descriptionElement.style.opacity = '0';
      setTimeout(() => {
        descriptionElement.style.opacity = '1';
      }, 300);
    }
  }
}


