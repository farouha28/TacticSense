import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

@Component({
  selector: 'ngx-ai-recommendation-selection',
  templateUrl: './ai-recommendation-selection.component.html',
  styleUrls: ['./ai-recommendation-selection.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('0.5s ease-in', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('slideIn', [
      transition(':enter', [
        query('.model-card', [
          style({ opacity: 0, transform: 'translateY(30px)' }),
          stagger(100, [
            animate('0.6s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ], { optional: true })
      ])
    ])
  ]
})
export class AiRecommendationSelectionComponent implements OnInit {

  models = [
    {
      id: 'tactical_compatibility',
      title: 'Compatibilité Tactique',
      description: 'Trouve des joueurs qui s\'intègrent parfaitement dans votre système de jeu et votre philosophie tactique.',
      icon: 'pantone-outline',
      color: 'info',
      features: [
        'Analyse du système de jeu',
        'Compatibilité positionnelle',
        'Style de jeu adapté',
        'Intégration tactique'
      ],
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    {
      id: 'hidden_gems',
      title: 'Pépites Sous-cotées',
      description: 'Identifie des talents cachés avec un excellent rapport qualité/prix et un potentiel de croissance élevé.',
      icon: 'trending-up-outline',
      color: 'success',
      features: [
        'Analyse de la valeur marchande',
        'Potentiel de progression',
        'Talents émergents',
        'Opportunités d\'investissement'
      ],
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
    },
    {
      id: 'position_analysis',
      title: 'Analyse par Poste',
      description: 'Analyse approfondie des joueurs selon leur position spécifique avec des métriques détaillées.',
      icon: 'options-2-outline',
      color: 'warning',
      features: [
        'Métriques spécialisées',
        'Comparaison par poste',
        'Analyse des performances',
        'Recommandations ciblées'
      ],
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
    }
  ];

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  selectModel(modelId: string): void {
    // Rediriger vers la page de recommandation avec le modèle sélectionné
    this.router.navigate(['/pages/players/recommendation'], { 
      queryParams: { model: modelId } 
    });
  }

  goBack(): void {
    this.router.navigate(['/pages/players']);
  }
}
