import { Component } from '@angular/core';

@Component({
  selector: 'ngx-coaches-list',
  templateUrl: './coaches-list.component.html',
  styleUrls: ['./coaches-list.component.scss']
})
// coaches-list.component.ts
export class CoachesListComponent implements OnInit {
  coaches = [
    { name: 'Zinedine Zidane', club: 'Real Madrid', experience: 10 },
    { name: 'Pep Guardiola', club: 'Manchester City', experience: 15 },
  ];

  ngOnInit(): void {}
}
