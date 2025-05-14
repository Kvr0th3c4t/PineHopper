import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FeatureCardComponent } from "../../components/feature-card/feature-card.component";
import { Ifeatures } from '../../interfaces/ifeatures';
import { FeatureContentService } from '../../services/feature-content.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, FeatureCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  featureContentService = inject(FeatureContentService);
  features: Ifeatures[] = [];
  
  ngOnInit() {
    this.features = this.featureContentService.getAll();
  }
}
