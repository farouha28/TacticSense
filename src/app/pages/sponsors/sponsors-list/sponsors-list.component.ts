import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-sponsors-list',
  templateUrl: './sponsors-list.component.html',
  styleUrls: ['./sponsors-list.component.scss']
})
export class SponsorsListComponent implements OnInit {

  sponsors = [
    { brand: 'Nike', amount: 1500000 },
    { brand: 'Adidas', amount: 1200000 },
  ];

  ngOnInit(): void {}
}
