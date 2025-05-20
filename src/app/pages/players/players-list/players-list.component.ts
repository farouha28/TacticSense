import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { PlayersService } from '../../../services/players.service';
import { NbDialogService, NbDialogRef } from '@nebular/theme';

// Définir les types
export enum RecommendationType {
  FIT_SCORE = 'fit_score',
  HIDDEN_VALUE = 'hidden_value',
  POSITION = 'position'
}

export interface Player {
  id: number;
  name: string;
  photo: string;
  age: number;
  nationality: string;
  position: string;
  club: string;
  club_logo: string;
  marketValue?: number;
  goals?: number;
  assists?: number;
  attributes?: {[key: string]: number};
  compatibility?: number;
}

@Component({
  selector: 'ngx-players-list',
  templateUrl: './players-list.component.html',
  styleUrls: ['./players-list.component.scss']
})
export class PlayersListComponent implements OnInit {
  @ViewChild('playerProfileTemplate') playerProfileTemplate: TemplateRef<any>;
  
  players: Player[] = [];
  filteredPlayers: Player[] = [];
  
  searchQuery: string = '';
  isLoading: boolean = false;
  showPositionSelect: boolean = false;
  selectedPosition: string = '';
  
  recommendationTypes = RecommendationType;
  
  private dialogRef: NbDialogRef<any>;

  constructor(
    private playersService: PlayersService,
    private dialogService: NbDialogService
  ) { }

  ngOnInit(): void {
    this.loadPlayers();
  }

  loadPlayers(): void {
    this.isLoading = true;
    this.playersService.getAllPlayers().subscribe(
      players => {
        this.players = players;
        this.filteredPlayers = [...players];
        this.isLoading = false;
      },
      error => {
        console.error('Erreur lors du chargement des joueurs:', error);
        this.isLoading = false;
      }
    );
  }

  filterPlayers(): void {
    if (!this.searchQuery.trim()) {
      this.filteredPlayers = [...this.players];
      return;
    }
    
    const query = this.searchQuery.toLowerCase();
    this.filteredPlayers = this.players.filter(player => 
      player.name.toLowerCase().includes(query) || 
      player.club.toLowerCase().includes(query) ||
      player.position.toLowerCase().includes(query) ||
      player.nationality.toLowerCase().includes(query)
    );
  }

  openPlayerProfile(player: Player): void {
    this.dialogRef = this.dialogService.open(this.playerProfileTemplate, {
      context: { player },
      hasBackdrop: true,
      closeOnBackdropClick: true,
      closeOnEsc: true,
    });
  }

  closeDialog(): void {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }

  getRecommendations(type: RecommendationType): void {
    if (type === RecommendationType.POSITION && !this.selectedPosition) {
      this.togglePositionSelect();
      return;
    }
    
    this.isLoading = true;
    
    this.playersService.getRecommendations(type, this.selectedPosition).subscribe(
      players => {
        this.filteredPlayers = players;
        this.isLoading = false;
        
        // Fermer le popover après sélection
        if (type === RecommendationType.POSITION && this.selectedPosition) {
          this.showPositionSelect = false;
        }
      },
      error => {
        console.error('Erreur lors de la récupération des recommandations:', error);
        this.isLoading = false;
      }
    );
  }

  togglePositionSelect(): void {
    this.showPositionSelect = !this.showPositionSelect;
  }

  onPositionSelected(): void {
    if (this.selectedPosition) {
      this.getRecommendations(RecommendationType.POSITION);
    }
  }

  getAttributeStatus(value: number): string {
    if (value >= 85) return 'success';
    if (value >= 70) return 'primary';
    if (value >= 50) return 'warning';
    return 'danger';
  }
}





















