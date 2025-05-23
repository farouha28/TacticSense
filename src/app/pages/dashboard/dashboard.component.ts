import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbThemeService } from '@nebular/theme';
import { takeWhile } from 'rxjs/operators';
import { SolarData } from '../../@core/data/solar';
import { trigger, transition, style, animate } from '@angular/animations';
import { PlayerService } from '../../@core/services/player.service';
import { Chart } from 'chart.js';

interface CardSettings {
  title: string;
  type: string;
  icon: string;
}

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms', style({ opacity: 1 })),
      ]),
    ]),
    trigger('slideUp', [
      transition(':enter', [
        style({ transform: 'translateY(20px)', opacity: 0 }),
        animate('500ms ease-out', style({ transform: 'translateY(0)', opacity: 1 })),
      ]),
    ]),
  ],
})
export class DashboardComponent implements OnInit {
  private alive = true;
  solarValue: number = 0;

  // Platform Statistics
  platformStats = [
    {
      value: '10,000+',
      label: 'Joueurs Analysés',
      icon: 'people-outline',
      type: 'primary',
      growth: 15
    },
    {
      value: '500+',
      label: 'Clubs Partenaires',
      icon: 'shield-outline',
      type: 'success',
      growth: 8
    },
    {
      value: '95%',
      label: 'Précision IA',
      icon: 'trending-up-outline',
      type: 'info',
      growth: 12
    },
    {
      value: '50+',
      label: 'Ligues Couvertes',
      icon: 'globe-outline',
      type: 'warning',
      growth: 20
    }
  ];

  // Services offered by the platform
  services = [
    {
      title: 'Analyse Prédictive',
      description: 'Algorithmes d\'IA avancés pour prédire les performances et identifier les talents émergents.',
      icon: 'trending-up-outline',
      category: 'Intelligence Artificielle',
      type: 'ai',
      buttonText: 'Découvrir',
      buttonStatus: 'primary',
      features: [
        'Prédictions de performance',
        'Identification de talents',
        'Analyse de compatibilité',
        'Évaluation de potentiel'
      ]
    },
    {
      title: 'Réseau Professionnel',
      description: 'Connectez-vous avec joueurs, clubs, agents et sponsors du monde entier.',
      icon: 'people-outline',
      category: 'Networking',
      type: 'network',
      buttonText: 'Explorer',
      buttonStatus: 'success',
      features: [
        'Base de données globale',
        'Profils vérifiés',
        'Système de contact',
        'Recommandations ciblées'
      ]
    },
    {
      title: 'Analytics Avancés',
      description: 'Tableaux de bord interactifs et rapports détaillés pour optimiser vos décisions.',
      icon: 'bar-chart-outline',
      category: 'Analytics',
      type: 'analytics',
      buttonText: 'Analyser',
      buttonStatus: 'info',
      features: [
        'Dashboards interactifs',
        'Rapports personnalisés',
        'Métriques en temps réel',
        'Export de données'
      ]
    },
    {
      title: 'Scouting Intelligent',
      description: 'Outils de scouting alimentés par l\'IA pour découvrir les perles rares.',
      icon: 'search-outline',
      category: 'Scouting',
      type: 'scouting',
      buttonText: 'Scout',
      buttonStatus: 'warning',
      features: [
        'Recherche intelligente',
        'Filtres avancés',
        'Alertes personnalisées',
        'Comparaisons détaillées'
      ]
    },
    {
      title: 'Gestion de Carrière',
      description: 'Accompagnement personnalisé pour optimiser les trajectoires professionnelles.',
      icon: 'star-outline',
      category: 'Carrière',
      type: 'career',
      buttonText: 'Gérer',
      buttonStatus: 'success',
      features: [
        'Planification de carrière',
        'Conseils personnalisés',
        'Opportunités ciblées',
        'Suivi de progression'
      ]
    },
    {
      title: 'Marketplace',
      description: 'Plateforme de mise en relation pour transferts et partenariats.',
      icon: 'shopping-bag-outline',
      category: 'Commerce',
      type: 'marketplace',
      buttonText: 'Négocier',
      buttonStatus: 'info',
      features: [
        'Négociations sécurisées',
        'Évaluations de marché',
        'Contrats intelligents',
        'Suivi des transferts'
      ]
    }
  ];

  // AI Models showcase
  aiModels = [
    {
      name: 'TacticPredict Pro',
      description: 'Modèle de prédiction tactique basé sur l\'analyse de millions de matchs',
      icon: 'cpu-outline',
      type: 'tactical',
      accuracy: 94.2,
      predictions: '2.5M+',
      successRate: 89
    },
    {
      name: 'TalentScout AI',
      description: 'Identification automatique des talents émergents et pépites cachées',
      icon: 'eye-outline',
      type: 'scouting',
      accuracy: 91.8,
      predictions: '1.8M+',
      successRate: 85
    },
    {
      name: 'PerformanceEngine',
      description: 'Analyse prédictive des performances individuelles et collectives',
      icon: 'flash-outline',
      type: 'performance',
      accuracy: 96.1,
      predictions: '3.2M+',
      successRate: 92
    }
  ];

  // Quick access items
  quickAccessItems = [
    {
      title: 'Joueurs',
      description: 'Explorez notre base de données de joueurs',
      icon: 'person-outline',
      type: 'players',
      route: '/pages/players',
      count: '10,000+'
    },
    {
      title: 'Clubs',
      description: 'Découvrez les clubs partenaires',
      icon: 'shield-outline',
      type: 'clubs',
      route: '/pages/clubs',
      count: '500+'
    },
    {
      title: 'Entraîneurs',
      description: 'Consultez les profils d\'entraîneurs',
      icon: 'briefcase-outline',
      type: 'coaches',
      route: '/pages/coaches',
      count: '200+'
    },
    {
      title: 'Agents',
      description: 'Connectez-vous avec des agents',
      icon: 'people-outline',
      type: 'agents',
      route: '/pages/agents',
      count: '150+'
    },
    {
      title: 'Sponsors',
      description: 'Explorez les opportunités de sponsoring',
      icon: 'award-outline',
      type: 'sponsors',
      route: '/pages/sponsors',
      count: '100+'
    },
    {
      title: 'Recommandations IA',
      description: 'Obtenez des recommandations personnalisées',
      icon: 'bulb-outline',
      type: 'ai',
      route: '/pages/players/ai-selection',
      count: 'Illimité'
    }
  ];

  players = [];
  aiRecommendation = null;
  isLoading = false;
  marketValueChart: Chart;
  nationalityChart: Chart;

  // Background options for hero section
  backgroundOptions = [
    { value: '', label: 'Terrain CSS Animé' },
    { value: 'with-field-image', label: 'Photo de Terrain' },
    { value: 'with-stadium-image', label: 'Stade' },
    { value: 'with-video-effect', label: 'Effet Vidéo' }
  ];
  selectedBackground = 'with-field-image'; // Default to field image

  constructor(
    private themeService: NbThemeService,
    private solarService: SolarData,
    private playerService: PlayerService,
    private router: Router,
  ) {
    this.themeService.getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe(theme => {
        // Fixed: Assuming getSolarData() returns a number directly
        this.solarValue = 76; // Hardcoded value instead of using solarService
      });
  }

  ngOnInit() {
    this.loadPlayers();
  }

  loadPlayers() {
    this.playerService.getTopPlayers().subscribe(players => {
      this.players = players;
      setTimeout(() => {
        this.initCharts();
      }, 500);
    });
  }

  getAiRecommendation() {
    this.isLoading = true;
    this.playerService.getAiRecommendation().subscribe(
      recommendation => {
        this.aiRecommendation = recommendation;
        this.isLoading = false;
      },
      error => {
        console.error('Error getting AI recommendation:', error);
        this.isLoading = false;
      }
    );
  }

  getPlayerPotential(player) {
    // Calculate potential based on age, goals, assists
    const ageFactor = Math.max(0, 100 - player.age * 2);
    const statsFactor = (player.goals * 2 + player.assists * 1.5) / 2;
    return Math.min(100, Math.round(ageFactor * 0.6 + statsFactor * 0.4));
  }

  getProgressStatus(player) {
    const potential = this.getPlayerPotential(player);
    if (potential >= 80) return 'success';
    if (potential >= 60) return 'info';
    if (potential >= 40) return 'warning';
    return 'danger';
  }

  getPositionClass(position) {
    switch (position) {
      case 'GK': return 'position-gk';
      case 'DEF': return 'position-def';
      case 'MID': return 'position-mid';
      case 'FWD': return 'position-fwd';
      default: return '';
    }
  }

  initCharts() {
    this.initMarketValueChart();
    this.initNationalityChart();
  }

  initMarketValueChart() {
    const ctx = document.getElementById('marketValueChart') as HTMLCanvasElement;
    if (!ctx) return;

    const positions = ['GK', 'DEF', 'MID', 'FWD'];
    const marketValues = positions.map(pos => {
      const posPlayers = this.players.filter(p => p.position === pos);
      return posPlayers.length ?
        Math.round(posPlayers.reduce((sum, p) => sum + p.marketValue, 0) / posPlayers.length) : 0;
    });

    this.themeService.getJsTheme().subscribe(theme => {
      const colors = theme.variables;
      // Fixed: Define chartjs with proper properties
      const chartjs = {
        textColor: '#b2bac2',
        axisLineColor: 'rgba(0,0,0,0.1)',
        bg: '#ffffff'
      };

      this.marketValueChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: positions,
          datasets: [{
            label: 'Average Market Value (M€)',
            data: marketValues,
            backgroundColor: [
              colors.primary,
              colors.success,
              colors.info,
              colors.warning,
            ],
            borderWidth: 1,
          }],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          legend: {
            display: false,
          },
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true,
                fontColor: chartjs.textColor,
              },
              gridLines: {
                color: chartjs.axisLineColor,
              },
            }],
            xAxes: [{
              ticks: {
                fontColor: chartjs.textColor,
              },
              gridLines: {
                color: chartjs.axisLineColor,
              },
            }],
          },
        },
      });
    });
  }

  initNationalityChart() {
    const ctx = document.getElementById('nationalityChart') as HTMLCanvasElement;
    if (!ctx) return;

    // Count players by nationality
    const nationalityCounts = {};
    this.players.forEach(player => {
      if (!nationalityCounts[player.nationality]) {
        nationalityCounts[player.nationality] = 0;
      }
      nationalityCounts[player.nationality]++;
    });

    // Sort and take top 5
    const sortedNationalities = Object.keys(nationalityCounts)
      .sort((a, b) => nationalityCounts[b] - nationalityCounts[a])
      .slice(0, 5);

    const data = sortedNationalities.map(nat => nationalityCounts[nat]);

    this.themeService.getJsTheme().subscribe(theme => {
      const colors = theme.variables;
      // Fixed: Define chartjs with proper properties
      const chartjs = {
        textColor: '#b2bac2',
        axisLineColor: 'rgba(0,0,0,0.1)',
        bg: '#ffffff'
      };

      this.nationalityChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: sortedNationalities,
          datasets: [{
            data: data,
            backgroundColor: [
              colors.primaryLight,
              colors.infoLight,
              colors.successLight,
              colors.warningLight,
              colors.dangerLight,
            ],
            borderWidth: 2,
            borderColor: chartjs.bg,
          }],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          legend: {
            position: 'right',
            labels: {
              fontColor: chartjs.textColor,
            },
          },
        },
      });
    });
  }

  // New methods for dashboard interactions
  exploreAI() {
    this.router.navigate(['/pages/players/ai-selection']);
  }

  watchDemo() {
    // Simulate demo functionality
    alert('Démo vidéo à venir ! Découvrez dès maintenant nos fonctionnalités IA.');
  }

  exploreService(service: any) {
    console.log('Exploring service:', service.title);
    // Navigate based on service type
    switch (service.type) {
      case 'ai':
      case 'scouting':
        this.router.navigate(['/pages/players/ai-selection']);
        break;
      case 'network':
        this.router.navigate(['/pages/players']);
        break;
      case 'analytics':
        this.router.navigate(['/pages/dashboard']);
        break;
      default:
        this.router.navigate(['/pages/players']);
    }
  }

  tryAIModel(model: any) {
    console.log('Trying AI model:', model.name);
    this.router.navigate(['/pages/players/ai-selection']);
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  getHeroBackgroundClass() {
    return this.selectedBackground;
  }

  changeBackground(backgroundClass: string) {
    this.selectedBackground = backgroundClass;
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
