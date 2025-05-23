// src/app/pages/players/player-profile/player-profile.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlayersService, Player } from '../../../services/players.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'ngx-player-profile',
  templateUrl: './player-profile.component.html',
  styleUrls: ['./player-profile.component.scss']
})
export class PlayerProfileComponent implements OnInit {
  player?: Player;
  isLoading = true;
  radarChart: any;
  playerHistory: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private playerService: PlayersService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadPlayer();
  }

  loadPlayer(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (isNaN(id)) {
      this.router.navigate(['/pages/players']);
      return;
    }

    this.playerService.getPlayerById(id).subscribe(
      (player) => {
        if (player) {
          this.player = player;
          this.generatePlayerHistory(player);
          setTimeout(() => {
            this.initRadarChart(player);
          }, 500);
        } else {
          this.router.navigate(['/pages/players']);
        }
        this.isLoading = false;
      },
      (error) => {
        console.error('Erreur lors du chargement du joueur', error);
        this.isLoading = false;
        this.router.navigate(['/pages/players']);
      }
    );
  }

  initRadarChart(player: Player): void {
    if (!player.attributes) return;

    const ctx = document.getElementById('playerRadarChart') as HTMLCanvasElement;
    if (!ctx) return;

    const attributes = player.attributes;
    const labels = Object.keys(attributes);
    const data = Object.values(attributes);

    if (this.radarChart) {
      this.radarChart.destroy();
    }

    this.radarChart = new Chart(ctx, {
      type: 'radar',
      data: {
        labels: labels,
        datasets: [{
          label: player.name,
          data: data,
          backgroundColor: 'rgba(51, 102, 255, 0.2)',
          borderColor: 'rgba(51, 102, 255, 1)',
          pointBackgroundColor: 'rgba(51, 102, 255, 1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(51, 102, 255, 1)'
        }]
      },
      options: {
        scales: {
          r: {
            angleLines: {
              display: true
            },
            suggestedMin: 0,
            suggestedMax: 100
          }
        }
      }
    });
  }

  generatePlayerHistory(player: Player): void {
    // Générer un historique fictif basé sur l'âge du joueur
    this.playerHistory = [];
    
    const currentYear = new Date().getFullYear();
    let startAge = 18;
    let currentAge = player.age;
    
    // Club actuel
    this.playerHistory.push({
      name: player.club,
      country: this.getRandomCountry(),
      years: `${currentYear - Math.min(3, currentAge - startAge)} - Présent`,
      appearances: Math.floor(Math.random() * 100) + 50,
      goals: player.position === 'Attaquant' ? Math.floor(Math.random() * 50) + 20 : Math.floor(Math.random() * 15),
    });
    
    // Clubs précédents (si le joueur est assez âgé)
    let remainingYears = currentAge - startAge - 3;
    while (remainingYears > 0) {
      const clubDuration = Math.min(remainingYears, Math.floor(Math.random() * 3) + 2);
      remainingYears -= clubDuration;
      
      this.playerHistory.push({
        name: this.getRandomClub(),
        country: this.getRandomCountry(),
        years: `${currentYear - remainingYears - clubDuration} - ${currentYear - remainingYears}`,
        appearances: Math.floor(Math.random() * 80) + 20,
        goals: player.position === 'Attaquant' ? Math.floor(Math.random() * 30) + 10 : Math.floor(Math.random() * 10),
      });
    }
  }

  getRandomClub(): string {
    const clubs = ['FC Barcelona', 'Real Madrid', 'Manchester United', 'Liverpool', 'Bayern Munich', 
                  'PSG', 'Juventus', 'AC Milan', 'Inter Milan', 'Ajax', 'Porto', 'Benfica'];
    return clubs[Math.floor(Math.random() * clubs.length)];
  }

  getRandomCountry(): string {
    const countries = ['Espagne', 'Angleterre', 'Allemagne', 'France', 'Italie', 'Pays-Bas', 'Portugal'];
    return countries[Math.floor(Math.random() * countries.length)];
  }

  getPositionClass(position: string): string {
    if (position.includes('Attaquant')) return 'position-attaquant';
    if (position.includes('Milieu')) return 'position-milieu';
    if (position.includes('Défenseur')) return 'position-defenseur';
    if (position.includes('Gardien')) return 'position-gardien';
    return 'position-default';
  }

  goBack(): void {
    this.router.navigate(['/pages/players']);
  }
}

