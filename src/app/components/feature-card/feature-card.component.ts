import { Component, Input } from '@angular/core';
import { Ifeatures } from '../../interfaces/ifeatures';

@Component({
  selector: 'app-feature-card',
  standalone: true,
  imports: [],
  templateUrl: './feature-card.component.html',
  styleUrl: './feature-card.component.css'
})
export class FeatureCardComponent {

  @Input() myFeature!: Ifeatures;
}
