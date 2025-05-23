import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Player } from '../../../models/player.model';
import { HttpClient } from '@angular/common/http';
import { trigger, transition, style, animate } from '@angular/animations';

interface RecommendationResult {
  modelUsed: string;
  confidenceScore: number;
  explanation: string;
  players: Player[];
}

@Component({
  selector: 'ngx-player-recommendation',
  templateUrl: './player-recommendation.component.html',
  styleUrls: ['./player-recommendation.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms', style({ opacity: 1 })),
      ]),
    ]),
    trigger('slideIn', [
      transition(':enter', [
        style({ transform: 'translateY(20px)', opacity: 0 }),
        animate('500ms ease-out', style({ transform: 'translateY(0)', opacity: 1 })),
      ]),
    ]),
  ],
})
export class PlayerRecommendationComponent implements OnInit {
  searchForm: FormGroup;
  isLoading = false;
  recommendation: RecommendationResult = null;
  allPlayers: Player[] = [];
  selectedModel: string = null;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.searchForm = this.fb.group({
      query: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadPlayers();

    // Check if a model was selected from the AI selection page
    this.route.queryParams.subscribe(params => {
      if (params['model']) {
        this.selectedModel = params['model'];
        this.autoGenerateRecommendation(params['model']);
      }
    });
  }

  loadPlayers(): void {
    this.http.get<Player[]>('assets/fake-data/players.json').subscribe(
      (data) => {
        this.allPlayers = data;
      },
      (error) => {
        console.error('Erreur lors du chargement des joueurs', error);
      }
    );
  }

  useExampleQuery(query: string): void {
    this.searchForm.get('query').setValue(query);
  }

  onSearch(): void {
    if (this.searchForm.valid) {
      this.isLoading = true;
      const query = this.searchForm.get('query').value;

      // Simuler un délai de chargement
      setTimeout(() => {
        this.generateRecommendation('query_analysis', query);
        this.isLoading = false;
      }, 2000);
    }
  }

  useModel(modelType: string): void {
    this.isLoading = true;

    // Simuler un délai de chargement
    setTimeout(() => {
      this.generateRecommendation(modelType);
      this.isLoading = false;
    }, 2000);
  }

  autoGenerateRecommendation(modelType: string): void {
    this.isLoading = true;

    // Simuler un délai de chargement
    setTimeout(() => {
      this.generateRecommendation(modelType);
      this.isLoading = false;
    }, 2000);
  }

  generateRecommendation(modelType: string, query?: string): void {
    // Sélectionner aléatoirement 3 joueurs
    const shuffled = [...this.allPlayers].sort(() => 0.5 - Math.random());
    const selectedPlayers = shuffled.slice(0, 3);

    // Ajouter un score de compatibilité pour chaque joueur
    selectedPlayers.forEach(player => {
      player.compatibility = Math.floor(Math.random() * 21) + 80; // Entre 80 et 100
    });

    // Trier par compatibilité
    selectedPlayers.sort((a, b) => b.compatibility - a.compatibility);

    let modelName: string;
    let explanation: string;

    switch (modelType) {
      case 'tactical_compatibility':
        modelName = 'Compatibilité Tactique';
        explanation = 'Notre modèle a analysé le style de jeu de votre équipe et a identifié ces joueurs comme étant particulièrement adaptés à votre système tactique. Ils possèdent les caractéristiques techniques et physiques qui s\'intègrent parfaitement à votre philosophie de jeu.';
        break;
      case 'hidden_gems':
        modelName = 'Pépites Sous-cotées';
        explanation = 'Ces joueurs présentent un excellent rapport qualité/prix selon notre modèle. Leurs performances réelles dépassent leur valeur marchande actuelle, ce qui en fait d\'excellentes opportunités de recrutement avec un fort potentiel de plus-value.';
        break;
      case 'position_analysis':
        modelName = 'Analyse par Poste';
        explanation = 'Notre modèle a effectué une analyse approfondie des caractéristiques spécifiques requises pour chaque poste. Ces joueurs excellent dans les attributs clés nécessaires à leur position et présentent des statistiques supérieures à la moyenne pour leur rôle.';
        break;
      case 'fit_score':
        modelName = 'Compatibilité tactique';
        explanation = 'Notre modèle a analysé le style de jeu de votre équipe et a identifié ces joueurs comme étant particulièrement adaptés à votre système tactique. Ils possèdent les caractéristiques techniques et physiques qui s\'intègrent parfaitement à votre philosophie de jeu.';
        break;
      case 'hidden_value':
        modelName = 'Pépites sous-cotées';
        explanation = 'Ces joueurs présentent un excellent rapport qualité/prix selon notre modèle. Leurs performances réelles dépassent leur valeur marchande actuelle, ce qui en fait d\'excellentes opportunités de recrutement avec un fort potentiel de plus-value.';
        break;
      case 'query_analysis':
        modelName = 'Analyse de requête';
        explanation = `Basé sur votre recherche "${query}", notre modèle a identifié ces joueurs comme correspondant le mieux à vos critères. L'analyse prend en compte les caractéristiques techniques, physiques et tactiques mentionnées dans votre description.`;
        break;
      default:
        modelName = 'Analyse générale';
        explanation = 'Notre modèle a analysé les performances récentes et les caractéristiques de milliers de joueurs pour vous proposer ces recommandations qui correspondent à vos besoins.';
    }

    this.recommendation = {
      modelUsed: modelName,
      confidenceScore: Math.floor(Math.random() * 11) + 85, // Entre 85 et 95
      explanation: explanation,
      players: selectedPlayers,
    };
  }

  goBack(): void {
    this.router.navigate(['/pages/players/ai-selection']);
  }

  getPositionBadgeStatus(position: string): string {
    switch (position.toLowerCase()) {
      case 'attaquant':
        return 'danger';
      case 'milieu':
        return 'info';
      case 'défenseur':
        return 'success';
      case 'gardien':
        return 'warning';
      default:
        return 'basic';
    }
  }

  getConfidenceColor(score: number): string {
    if (score >= 95) return 'success';
    if (score >= 90) return 'info';
    if (score >= 85) return 'warning';
    return 'danger';
  }
}


