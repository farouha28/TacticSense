import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  private alive = true;
  
  transfersChartOptions: any = {};
  themeVariables: any;
  
  recentTransfers = [
    {
      player: {
        name: 'Kylian Mbappé',
        picture: 'assets/images/players/mbappe.jpg',
      },
      fromClub: {
        name: 'PSG',
        logo: 'assets/images/clubs/psg.png',
      },
      toClub: {
        name: 'Real Madrid',
        logo: 'assets/images/clubs/real.png',
      },
      amount: 180000000,
      date: new Date('2023-06-15'),
    },
    {
      player: {
        name: 'Erling Haaland',
        picture: 'assets/images/players/haaland.jpg',
      },
      fromClub: {
        name: 'Dortmund',
        logo: 'assets/images/clubs/dortmund.png',
      },
      toClub: {
        name: 'Man City',
        logo: 'assets/images/clubs/mancity.png',
      },
      amount: 60000000,
      date: new Date('2022-07-01'),
    },
    {
      player: {
        name: 'Jude Bellingham',
        picture: 'assets/images/players/bellingham.jpg',
      },
      fromClub: {
        name: 'Dortmund',
        logo: 'assets/images/clubs/dortmund.png',
      },
      toClub: {
        name: 'Real Madrid',
        logo: 'assets/images/clubs/real.png',
      },
      amount: 103000000,
      date: new Date('2023-06-14'),
    },
    {
      player: {
        name: 'Declan Rice',
        picture: 'assets/images/players/rice.jpg',
      },
      fromClub: {
        name: 'West Ham',
        logo: 'assets/images/clubs/westham.png',
      },
      toClub: {
        name: 'Arsenal',
        logo: 'assets/images/clubs/arsenal.png',
      },
      amount: 116000000,
      date: new Date('2023-07-15'),
    },
    {
      player: {
        name: 'Enzo Fernandez',
        picture: 'assets/images/players/fernandez.jpg',
      },
      fromClub: {
        name: 'Benfica',
        logo: 'assets/images/clubs/benfica.png',
      },
      toClub: {
        name: 'Chelsea',
        logo: 'assets/images/clubs/chelsea.png',
      },
      amount: 121000000,
      date: new Date('2023-01-31'),
    }
  ];
  
  topPlayers = [
    {
      name: 'Kylian Mbappé',
      club: 'Real Madrid',
      picture: 'assets/images/players/mbappe.jpg',
      value: 180000000,
    },
    {
      name: 'Erling Haaland',
      club: 'Manchester City',
      picture: 'assets/images/players/haaland.jpg',
      value: 170000000,
    },
    {
      name: 'Vinicius Jr',
      club: 'Real Madrid',
      picture: 'assets/images/players/vinicius.jpg',
      value: 150000000,
    },
    {
      name: 'Jude Bellingham',
      club: 'Real Madrid',
      picture: 'assets/images/players/bellingham.jpg',
      value: 120000000,
    },
    {
      name: 'Phil Foden',
      club: 'Manchester City',
      picture: 'assets/images/players/foden.jpg',
      value: 110000000,
    }
  ];
  
  upcomingEvents = [
    {
      title: 'Mercato d\'été - Ouverture',
      date: new Date('2023-07-01'),
      location: 'International',
    },
    {
      title: 'Premier League - Début de saison',
      date: new Date('2023-08-12'),
      location: 'Angleterre',
    },
    {
      title: 'Ligue 1 - Début de saison',
      date: new Date('2023-08-19'),
      location: 'France',
    },
    {
      title: 'Gala des trophées FIFA',
      date: new Date('2023-09-15'),
      location: 'Zurich, Suisse',
    },
    {
      title: 'Mercato d\'hiver - Ouverture',
      date: new Date('2024-01-01'),
      location: 'International',
    }
  ];

  constructor(private themeService: NbThemeService) {
    this.themeService.getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe(theme => {
        this.themeVariables = theme.variables;
        this.initCharts();
      });
  }

  ngOnInit() {
    // Initialisation supplémentaire si nécessaire
  }

  initCharts() {
    this.transfersChartOptions = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: [
        {
          type: 'category',
          data: ['Premier League', 'La Liga', 'Bundesliga', 'Serie A', 'Ligue 1'],
          axisTick: {
            alignWithLabel: true,
          },
          axisLine: {
            lineStyle: {
              color: this.themeVariables.chartLineColor,
            },
          },
          axisLabel: {
            color: this.themeVariables.chartTextColor,
          },
        },
      ],
      yAxis: [
        {
          type: 'value',
          axisLine: {
            lineStyle: {
              color: this.themeVariables.chartLineColor,
            },
          },
          splitLine: {
            lineStyle: {
              color: this.themeVariables.chartAxisSplitLine,
            },
          },
          axisLabel: {
            color: this.themeVariables.chartTextColor,
            formatter: '{value} M€',
          },
        },
      ],
      series: [
        {
          name: 'Dépenses',
          type: 'bar',
          barWidth: '60%',
          data: [850, 720, 450, 380, 320],
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: this.themeVariables.primary },
              { offset: 1, color: this.themeVariables.primaryLight },
            ]),
            borderRadius: [5, 5, 0, 0],
          },
        },
      ],
    };
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
