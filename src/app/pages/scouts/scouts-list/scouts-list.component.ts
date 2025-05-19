import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-scouts-list',
  templateUrl: './scouts-list.component.html',
  styleUrls: ['./scouts-list.component.scss']
})
export class ScoutsListComponent implements OnInit {

  scouts = [
    { name: 'Ahmed Gharbi', region: 'Afrique du Nord' },
    { name: 'Luc Dubois', region: "Europe de l'Est" },
  ];

  ngOnInit(): void {}
}
