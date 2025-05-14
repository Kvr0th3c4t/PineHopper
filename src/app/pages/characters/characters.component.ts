import { Component } from '@angular/core';
import { SwipperCardComponent } from "../../components/swipper-card/swipper-card.component";

@Component({
  selector: 'app-characters',
  standalone: true,
  imports: [SwipperCardComponent],
  templateUrl: './characters.component.html',
  styleUrl: './characters.component.css'
})
export class CharactersComponent {

}
