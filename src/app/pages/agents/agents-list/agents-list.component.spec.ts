import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-agents-list',
  templateUrl: './agents-list.component.html',
  styleUrls: ['./agents-list.component.scss']
})
export class AgentsListComponent implements OnInit {
  agents = [
    { name: 'Mino Raiola', clients: 25 },
    { name: 'Jorge Mendes', clients: 40 },
    { name: 'Pini Zahavi', clients: 18 },
    { name: 'Jonathan Barnett', clients: 33 }
  ];

  constructor() {}

  ngOnInit(): void {}
}
