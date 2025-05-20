import { Component, OnInit } from '@angular/core';
import { Coach, CoachesService } from '../../../services/coaches.service';

@Component({
  selector: 'ngx-coaches-list',
  templateUrl: './coaches-list.component.html',
  styleUrls: ['./coaches-list.component.scss']
})
export class CoachesListComponent implements OnInit {
  coaches: Coach[] = [];
  filteredCoaches: Coach[] = [];
  searchQuery: string = '';

  constructor(private coachesService: CoachesService) {}

  ngOnInit(): void {
    this.coachesService.getAllCoaches().subscribe(coaches => {
      this.coaches = coaches;
      this.filteredCoaches = coaches;
    });
  }

  filterCoaches(): void {
    if (!this.searchQuery) {
      this.filteredCoaches = this.coaches;
      return;
    }
    
    const query = this.searchQuery.toLowerCase();
    this.filteredCoaches = this.coaches.filter(coach => 
      coach.name.toLowerCase().includes(query) || 
      coach.nationality.toLowerCase().includes(query) ||
      coach.club.toLowerCase().includes(query)
    );
  }
}

