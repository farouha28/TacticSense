import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Player } from '../../../models/player.model';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'ngx-player-card',
  templateUrl: './player-card.component.html',
  styleUrls: ['./player-card.component.scss'],
  animations: [
    trigger('cardHover', [
      transition(':enter', [
        style({ transform: 'scale(0.95)', opacity: 0 }),
        animate('0.3s ease-out', style({ transform: 'scale(1)', opacity: 1 }))
      ])
    ]),
    trigger('slideIn', [
      transition(':enter', [
        style({ transform: 'translateY(20px)', opacity: 0 }),
        animate('0.4s ease-out', style({ transform: 'translateY(0)', opacity: 1 }))
      ])
    ])
  ]
})
export class PlayerCardComponent {
  @Input() player: Player;
  @Input() showActions: boolean = true;
  @Output() profileClick = new EventEmitter<Player>();
  @Output() contactClick = new EventEmitter<Player>();

  showProfileDialog = false;

  constructor() {}

  onProfileClick(): void {
    this.showProfileDialog = true;
    this.profileClick.emit(this.player);
  }

  onContactClick(): void {
    this.contactClick.emit(this.player);
  }

  closeProfileDialog(): void {
    this.showProfileDialog = false;
  }

  getPositionColor(position: string): string {
    const positionColors = {
      'GK': '#e74c3c',      // Rouge pour gardien
      'DEF': '#3498db',     // Bleu pour défenseur
      'MID': '#2ecc71',     // Vert pour milieu
      'ATT': '#f39c12',     // Orange pour attaquant
      'FW': '#f39c12'       // Orange pour avant
    };
    return positionColors[position] || '#95a5a6';
  }

  getPotentialColor(potential: number): string {
    if (potential >= 90) return '#e74c3c';  // Rouge - Exceptionnel
    if (potential >= 80) return '#f39c12';  // Orange - Très bon
    if (potential >= 70) return '#f1c40f';  // Jaune - Bon
    if (potential >= 60) return '#2ecc71';  // Vert - Moyen
    return '#95a5a6';  // Gris - Faible
  }

  getCompatibilityColor(compatibility: number): string {
    if (compatibility >= 90) return '#e74c3c';  // Rouge - Excellent
    if (compatibility >= 80) return '#f39c12';  // Orange - Très bon
    if (compatibility >= 70) return '#f1c40f';  // Jaune - Bon
    if (compatibility >= 60) return '#2ecc71';  // Vert - Moyen
    return '#95a5a6';  // Gris - Faible
  }

  formatValue(value: number): string {
    if (value >= 1000000) {
      return (value / 1000000).toFixed(1) + 'M€';
    } else if (value >= 1000) {
      return (value / 1000).toFixed(0) + 'K€';
    }
    return value + '€';
  }
}
