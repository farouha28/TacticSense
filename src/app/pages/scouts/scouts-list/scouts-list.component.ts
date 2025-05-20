import { Component, OnInit } from '@angular/core';
import { Scout, ScoutsService } from '../../../services/scouts.service';

@Component({
  selector: 'ngx-scouts-list',
  templateUrl: './scouts-list.component.html',
  styleUrls: ['./scouts-list.component.scss'],
})
export class ScoutsListComponent implements OnInit {
  scouts: Scout[] = [];
  filteredScouts: Scout[] = [];
  searchQuery: string = '';

  constructor(private scoutsService: ScoutsService) { }

  ngOnInit() {
    this.loadScouts();
  }

  loadScouts() {
    this.scoutsService.getAllScouts().subscribe(data => {
      this.scouts = data;
      this.filteredScouts = [...this.scouts];
    });
  }

  searchScouts() {
    if (!this.searchQuery.trim()) {
      this.filteredScouts = [...this.scouts];
      return;
    }

    const query = this.searchQuery.toLowerCase();
    this.filteredScouts = this.scouts.filter(scout => 
      scout.name.toLowerCase().includes(query) ||
      scout.nationality.toLowerCase().includes(query) ||
      scout.club.toLowerCase().includes(query) ||
      scout.region.toLowerCase().includes(query)
    );
  }
}


