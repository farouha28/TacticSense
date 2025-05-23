import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NbDialogService, NbDialogRef } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

// Add imports for forms
import { FormControl } from '@angular/forms';

// Interface for players
interface Player {
  id: number;
  name: string;
  photo: string;
  age: number;
  nationality: string;
  position: string;
  club: string;
  status: string;
  trophies: number;
  goals: number;
  assists: number;
  marketValue: number;
  compatibility?: number;
  attributes?: {[key: string]: number};
  useDefaultImage?: boolean;
}

// Interface for recommendation results
interface RecommendationResult {
  players: Player[];
  confidence: number;
  explanation: string;
}

@Component({
  selector: 'ngx-players-list',
  templateUrl: './players-list.component.html',
  styleUrls: ['./players-list.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('400ms ease-in', style({ opacity: 1 })),
      ]),
    ]),
    trigger('slideIn', [
      transition(':enter', [
        style({ transform: 'translateY(20px)', opacity: 0 }),
        animate('{{delay}}ms ease-out', style({ transform: 'translateY(0)', opacity: 1 })),
      ], { params: { delay: 300 } }),
    ]),
  ],
})
export class PlayersListComponent implements OnInit {
  @ViewChild('playerProfileModal') playerProfileModal: TemplateRef<any>;

  // Reference to active dialog
  dialogRef: NbDialogRef<any> = null;

  players: Player[] = [];
  filteredPlayers: Player[] = [];
  selectedPlayer: Player = null;
  playerAttributes: {key: string, value: number}[] = [];
  playerAiInsight: string = '';

  // Properties for search and filtering
  searchQuery: string = '';
  selectedNationality: string = '';
  selectedPosition: string = '';
  nationalities: string[] = [];
  positions: string[] = [];

  // Properties for AI recommendation
  showAiRecommendation: boolean = false;
  isLoadingRecommendation: boolean = false;
  recommendationResult: RecommendationResult = null;

  // New properties for recommendation types and forms
  selectedRecommendationType: 'tactical' | 'budget' | 'potential' = null;
  tacticalForm: FormGroup;
  budgetForm: FormGroup;
  potentialForm: FormGroup;

  // Multi-select values
  selectedAttributes: string[] = [];
  selectedRegions: string[] = [];

  constructor(
    private http: HttpClient,
    private router: Router,
    private dialogService: NbDialogService,
    private fb: FormBuilder
  ) {
    // Initialize forms
    this.tacticalForm = this.fb.group({
      formation: ['4-3-3', Validators.required],
      playingStyle: ['possession', Validators.required],
      position: ['midfielder', Validators.required],
      experience: ['prime', Validators.required],
      keyAttributes: [[], [Validators.required, Validators.maxLength(3)]]
    });

    this.budgetForm = this.fb.group({
      maxBudget: [50, [Validators.required, Validators.min(1)]],
      position: ['forward', Validators.required],
      priority: ['quality', Validators.required],
      league: ['any', Validators.required]
    });

    this.potentialForm = this.fb.group({
      ageRange: ['u21', Validators.required],
      position: ['any', Validators.required],
      timeline: ['short', Validators.required],
      regions: [[], Validators.required]
    });
  }

  ngOnInit() {
    this.loadPlayers();
  }

  loadPlayers() {
    this.http.get<Player[]>('assets/fake-data/players.json').subscribe(data => {
      this.players = data;
      this.filteredPlayers = [...this.players];

      // Extract unique nationalities and positions for filters
      this.nationalities = [...new Set(this.players.map(player => player.nationality))].sort();
      this.positions = [...new Set(this.players.map(player => player.position))].sort();
    });
  }

  filterPlayers() {
    this.filteredPlayers = this.players.filter(player => {
      // Filter by search query
      const nameMatch = player.name.toLowerCase().includes(this.searchQuery.toLowerCase());

      // Filter by nationality if selected
      const nationalityMatch = !this.selectedNationality || player.nationality === this.selectedNationality;

      // Filter by position if selected
      const positionMatch = !this.selectedPosition || player.position === this.selectedPosition;

      return nameMatch && nationalityMatch && positionMatch;
    });
  }

  viewPlayerProfile(player: Player) {
    this.selectedPlayer = player;

    // Convert player attributes object to array for display
    this.playerAttributes = Object.entries(player.attributes || {}).map(([key, value]) => ({
      key,
      value: value as number
    }));

    // Generate AI insight for the player
    this.generatePlayerInsight(player);

    // Open dialog with player profile
    this.dialogRef = this.dialogService.open(this.playerProfileModal, {
      context: {
        player: this.selectedPlayer
      },
      hasBackdrop: true,
      closeOnBackdropClick: true,
      closeOnEsc: true
    });
  }

  generatePlayerInsight(player: Player) {
    // In a real app, this would call an AI service
    // For now, we'll generate some fake insights based on player data

    const insights = [
      `${player.name} is particularly effective in ${this.getRandomTactic()} systems.`,
      `Based on recent performances, ${player.name} shows exceptional ability in ${this.getRandomSkill()}.`,
      `Statistical analysis suggests ${player.name} would pair well with fast wingers and technical midfielders.`,
      `${player.name}'s heat map indicates a tendency to ${this.getRandomMovement()}.`,
      `Compared to similar players, ${player.name} excels in ${this.getRandomStat()} but could improve ${this.getRandomWeakness()}.`
    ];

    this.playerAiInsight = insights.join(' ');
  }

  getRandomTactic() {
    const tactics = ['possession-based', 'counter-attacking', 'high-pressing', 'direct play', 'tiki-taka'];
    return tactics[Math.floor(Math.random() * tactics.length)];
  }

  getRandomSkill() {
    const skills = ['off-the-ball movement', 'defensive positioning', 'creating space', 'one-on-one situations', 'set pieces'];
    return skills[Math.floor(Math.random() * skills.length)];
  }

  getRandomMovement() {
    const movements = ['drift wide when attacking', 'drop deep to collect the ball', 'make late runs into the box', 'cut inside from wide positions', 'press aggressively in the final third'];
    return movements[Math.floor(Math.random() * movements.length)];
  }

  getRandomStat() {
    const stats = ['progressive passes', 'aerial duels', 'ball recoveries', 'expected goals (xG)', 'key passes', 'defensive actions'];
    return stats[Math.floor(Math.random() * stats.length)];
  }

  getRandomWeakness() {
    const weaknesses = ['defensive work rate', 'aerial ability', 'long-range passing', 'finishing in one-on-one situations', 'concentration in the final minutes'];
    return weaknesses[Math.floor(Math.random() * weaknesses.length)];
  }

  getPositionClass(position: string): string {
    switch (position) {
      case 'goalkeeper': return 'position-gk';
      case 'defender': return 'position-def';
      case 'midfielder': return 'position-mid';
      case 'forward': return 'position-fwd';
      default: return '';
    }
  }

  getPositionLabel(position: string): string {
    switch (position) {
      case 'goalkeeper': return 'GK';
      case 'defender': return 'DEF';
      case 'midfielder': return 'MID';
      case 'forward': return 'FWD';
      default: return position;
    }
  }

  // AI Recommendation methods
  toggleAiRecommendation() {
    this.showAiRecommendation = !this.showAiRecommendation;

    if (!this.showAiRecommendation) {
      this.resetRecommendation();
    }
  }

  selectRecommendationType(type: 'tactical' | 'budget' | 'potential') {
    this.selectedRecommendationType = type;
  }

  backToRecommendationTypes() {
    this.selectedRecommendationType = null;
  }

  updateSelectedAttributes(attributes: string[]) {
    if (attributes.length > 3) {
      this.selectedAttributes = attributes.slice(0, 3);
      this.tacticalForm.get('keyAttributes').setValue(this.selectedAttributes);
    } else {
      this.selectedAttributes = attributes;
    }
  }

  updateSelectedRegions(regions: string[]) {
    this.selectedRegions = regions;
  }

  submitTacticalForm() {
    if (this.tacticalForm.valid) {
      this.isLoadingRecommendation = true;

      // Simulate API call with timeout
      setTimeout(() => {
        // Generate recommendation based on form values
        const formValues = this.tacticalForm.value;

        // Create a filtered and sorted list of players based on tactical criteria
        const recommendedPlayers = this.generateTacticalRecommendations(formValues);

        this.recommendationResult = {
          players: recommendedPlayers,
          confidence: Math.floor(Math.random() * 20) + 80, // Random confidence between 80-99%
          explanation: this.generateTacticalExplanation(formValues)
        };

        this.isLoadingRecommendation = false;
      }, 2500);
    }
  }

  submitBudgetForm() {
    if (this.budgetForm.valid) {
      this.isLoadingRecommendation = true;

      // Simulate API call with timeout
      setTimeout(() => {
        // Generate recommendation based on form values
        const formValues = this.budgetForm.value;

        // Create a filtered and sorted list of players based on budget criteria
        const recommendedPlayers = this.generateBudgetRecommendations(formValues);

        this.recommendationResult = {
          players: recommendedPlayers,
          confidence: Math.floor(Math.random() * 20) + 80, // Random confidence between 80-99%
          explanation: this.generateBudgetExplanation(formValues)
        };

        this.isLoadingRecommendation = false;
      }, 2500);
    }
  }

  submitPotentialForm() {
    if (this.potentialForm.valid) {
      this.isLoadingRecommendation = true;

      // Simulate API call with timeout
      setTimeout(() => {
        // Generate recommendation based on form values
        const formValues = this.potentialForm.value;

        // Create a filtered and sorted list of players based on potential criteria
        const recommendedPlayers = this.generatePotentialRecommendations(formValues);

        this.recommendationResult = {
          players: recommendedPlayers,
          confidence: Math.floor(Math.random() * 20) + 80, // Random confidence between 80-99%
          explanation: this.generatePotentialExplanation(formValues)
        };

        this.isLoadingRecommendation = false;
      }, 2500);
    }
  }

  generateTacticalRecommendations(formValues: any): Player[] {
    // Filter players based on position
    let filteredPlayers = this.players.filter(player => player.position === formValues.position);

    // Filter by experience level
    if (formValues.experience === 'young') {
      filteredPlayers = filteredPlayers.filter(player => player.age <= 21);
    } else if (formValues.experience === 'prime') {
      filteredPlayers = filteredPlayers.filter(player => player.age > 21 && player.age <= 28);
    } else if (formValues.experience === 'experienced') {
      filteredPlayers = filteredPlayers.filter(player => player.age > 28);
    }

    // Add compatibility score based on playing style and formation
    filteredPlayers = filteredPlayers.map(player => {
      const compatibility = this.calculateTacticalCompatibility(player, formValues);
      return { ...player, compatibility };
    });

    // Sort by compatibility score
    filteredPlayers.sort((a, b) => (b.compatibility || 0) - (a.compatibility || 0));

    // Return top 3 players
    return filteredPlayers.slice(0, 3);
  }

  calculateTacticalCompatibility(player: Player, formValues: any): number {
    // This would be a complex algorithm in a real app
    // For demo purposes, we'll use a simplified approach

    let score = 70; // Base score

    // Add points based on attributes that match the playing style
    if (formValues.playingStyle === 'possession' && player.attributes?.['Passing'] > 85) {
      score += 10;
    }

    if (formValues.playingStyle === 'counter' && player.attributes?.['Speed'] > 85) {
      score += 10;
    }

    if (formValues.playingStyle === 'pressing' && player.attributes?.['Physical'] > 85) {
      score += 10;
    }

    if (formValues.playingStyle === 'direct' && player.attributes?.['Finishing'] > 85) {
      score += 10;
    }

    // Add random factor (in a real app, this would be based on more detailed analysis)
    score += Math.floor(Math.random() * 10);

    // Cap at 99
    return Math.min(score, 99);
  }

  generateBudgetRecommendations(formValues: any): Player[] {
    // Filter players based on position and budget
    let filteredPlayers = this.players.filter(player =>
      player.position === formValues.position &&
      player.marketValue <= formValues.maxBudget
    );

    // Add compatibility score based on priority
    filteredPlayers = filteredPlayers.map(player => {
      const compatibility = this.calculateBudgetCompatibility(player, formValues);
      return { ...player, compatibility };
    });

    // Sort by compatibility score
    filteredPlayers.sort((a, b) => (b.compatibility || 0) - (a.compatibility || 0));

    // Return top 3 players
    return filteredPlayers.slice(0, 3);
  }

  calculateBudgetCompatibility(player: Player, formValues: any): number {
    let score = 70; // Base score

    // Calculate score based on priority
    if (formValues.priority === 'quality') {
      // Higher score for better overall attributes
      const avgAttributes = Object.values(player.attributes || {}).reduce((sum: number, val: number) => sum + val, 0) /
                           Object.values(player.attributes || {}).length;
      score += Math.min(20, avgAttributes / 5);
    } else if (formValues.priority === 'value') {
      // Higher score for better value (attributes vs cost)
      const avgAttributes = Object.values(player.attributes || {}).reduce((sum: number, val: number) => sum + val, 0) /
                           Object.values(player.attributes || {}).length;
      const valueRatio = avgAttributes / player.marketValue;
      score += Math.min(20, valueRatio * 10);
    } else if (formValues.priority === 'potential') {
      // Higher score for younger players
      score += Math.min(20, (30 - player.age) * 2);
    }

    // Add random factor
    score += Math.floor(Math.random() * 10);

    // Cap at 99
    return Math.min(score, 99);
  }

  generatePotentialRecommendations(formValues: any): Player[] {
    // Filter players based on age range
    let maxAge = 23; // Default for u23

    if (formValues.ageRange === 'u18') {
      maxAge = 18;
    } else if (formValues.ageRange === 'u21') {
      maxAge = 21;
    }

    let filteredPlayers = this.players.filter(player => player.age <= maxAge);

    // Filter by position if not "any"
    if (formValues.position !== 'any') {
      filteredPlayers = filteredPlayers.filter(player => player.position === formValues.position);
    }

    // Add compatibility score based on potential
    filteredPlayers = filteredPlayers.map(player => {
      const compatibility = this.calculatePotentialCompatibility(player, formValues);
      return { ...player, compatibility };
    });

    // Sort by compatibility score
    filteredPlayers.sort((a, b) => (b.compatibility || 0) - (a.compatibility || 0));

    // Return top 3 players
    return filteredPlayers.slice(0, 3);
  }

  calculatePotentialCompatibility(player: Player, formValues: any): number {
    let score = 70; // Base score

    // Calculate score based on timeline
    if (formValues.timeline === 'immediate') {
      // Higher score for players with better current attributes
      const avgAttributes = Object.values(player.attributes || {}).reduce((sum: number, val: number) => sum + val, 0) /
                           Object.values(player.attributes || {}).length;
      score += Math.min(20, avgAttributes / 5);
    } else if (formValues.timeline === 'short') {
      // Balance between current attributes and age
      const avgAttributes = Object.values(player.attributes || {}).reduce((sum: number, val: number) => sum + val, 0) /
                           Object.values(player.attributes || {}).length;
      score += Math.min(10, avgAttributes / 10);
      score += Math.min(10, (23 - player.age) * 2);
    } else if (formValues.timeline === 'long') {
      // Higher score for younger players
      score += Math.min(20, (23 - player.age) * 3);
    }

    // Add random factor
    score += Math.floor(Math.random() * 10);

    // Cap at 99
    return Math.min(score, 99);
  }

  generateTacticalExplanation(formValues: any): string {
    return `Based on your ${formValues.formation} formation and ${formValues.playingStyle} playing style, we've identified players who would excel in your tactical setup. We've prioritized ${formValues.experience} players for the ${formValues.position} position with strengths in ${formValues.keyAttributes.join(', ')}.`;
  }

  generateBudgetExplanation(formValues: any): string {
    return `We've analyzed the market to find the best ${formValues.maxBudget}M ${formValues.position} players. Our ${formValues.priority} priority has led us to recommend these players, who offer a good balance of attributes and value for your budget.`;
  }

  generatePotentialExplanation(formValues: any): string {
    return `For ${formValues.timeline} transfers, we've identified ${formValues.ageRange} ${formValues.position} players with high potential. These players offer a mix of current ability and future development potential, making them excellent investments for your team.`;
  }

  resetRecommendation() {
    this.selectedRecommendationType = null;
    this.recommendationResult = null;
    this.tacticalForm.reset();
    this.budgetForm.reset();
    this.potentialForm.reset();
  }

  goToAiRecommendation() {
    this.router.navigate(['/pages/players/ai-selection']);
  }

  contactPlayer(player: Player) {
    // Simulate contact functionality
    console.log('Contacting player:', player.name);
    // In a real app, this would open a contact form or send an email
    alert(`Contacting ${player.name}... This feature will be implemented soon!`);
  }
}


