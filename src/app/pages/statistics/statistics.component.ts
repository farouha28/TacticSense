import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'ngx-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
})
export class StatisticsComponent implements OnInit, OnDestroy {
  private alive = true;
  
  transfersChartOptions: any = {};
  playerValueOptions: any = {};
  leagueComparisonOptions: any = {};
  
  constructor(private theme: NbThemeService) {}

  ngOnInit() {
    this.theme.getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe(config => {
        const colors = config.variables;
        const echarts: any = config.variables.echarts;

        this.transfersChartOptions = {
          backgroundColor: echarts.bg,
          color: [colors.primaryLight, colors.infoLight, colors.successLight, colors.warningLight, colors.dangerLight],
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)',
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            data: ['Premier League', 'La Liga', 'Serie A', 'Bundesliga', 'Ligue 1'],
            textStyle: {
              color: echarts.textColor,
            },
          },
          series: [
            {
              name: 'Dépenses de transfert',
              type: 'pie',
              radius: '80%',
              center: ['50%', '50%'],
              data: [
                { value: 2800, name: 'Premier League' },
                { value: 1200, name: 'La Liga' },
                { value: 950, name: 'Serie A' },
                { value: 850, name: 'Bundesliga' },
                { value: 750, name: 'Ligue 1' },
              ],
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: echarts.itemHoverShadowColor,
                },
              },
              label: {
                normal: {
                  textStyle: {
                    color: echarts.textColor,
                  },
                },
              },
              labelLine: {
                normal: {
                  lineStyle: {
                    color: echarts.axisLineColor,
                  },
                },
              },
            },
          ],
        };

        this.playerValueOptions = {
          backgroundColor: echarts.bg,
          color: [colors.primaryLight],
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
              data: ['Mbappé', 'Haaland', 'Vinicius Jr', 'Bellingham', 'Rodri', 'Foden', 'Valverde', 'Saka', 'Wirtz', 'Musiala'],
              axisTick: {
                alignWithLabel: true,
              },
              axisLine: {
                lineStyle: {
                  color: echarts.axisLineColor,
                },
              },
              axisLabel: {
                textStyle: {
                  color: echarts.textColor,
                },
                rotate: 45,
                fontSize: 11,
              },
            },
          ],
          yAxis: [
            {
              type: 'value',
              axisLine: {
                lineStyle: {
                  color: echarts.axisLineColor,
                },
              },
              splitLine: {
                lineStyle: {
                  color: echarts.splitLineColor,
                },
              },
              axisLabel: {
                textStyle: {
                  color: echarts.textColor,
                },
              },
            },
          ],
          series: [
            {
              name: 'Valeur marchande (M€)',
              type: 'bar',
              barWidth: '60%',
              data: [180, 170, 150, 120, 110, 110, 100, 100, 100, 100],
            },
          ],
        };

        this.leagueComparisonOptions = {
          backgroundColor: echarts.bg,
          color: [colors.primaryLight, colors.infoLight, colors.successLight],
          tooltip: {
            trigger: 'axis',
          },
          legend: {
            data: ['Revenus TV', 'Revenus commerciaux', 'Revenus billetterie'],
            textStyle: {
              color: echarts.textColor,
            },
          },
          radar: {
            name: {
              textStyle: {
                color: echarts.textColor,
              },
            },
            indicator: [
              { name: 'Premier League', max: 100 },
              { name: 'La Liga', max: 100 },
              { name: 'Serie A', max: 100 },
              { name: 'Bundesliga', max: 100 },
              { name: 'Ligue 1', max: 100 },
            ],
            splitArea: {
              areaStyle: {
                color: echarts.bg,
                opacity: 0.1,
              },
            },
            axisLine: {
              lineStyle: {
                color: echarts.axisLineColor,
              },
            },
          },
          series: [
            {
              name: 'Revenus par ligue',
              type: 'radar',
              data: [
                {
                  value: [90, 70, 60, 65, 45],
                  name: 'Revenus TV',
                },
                {
                  value: [70, 80, 65, 85, 60],
                  name: 'Revenus commerciaux',
                },
                {
                  value: [80, 75, 70, 90, 50],
                  name: 'Revenus billetterie',
                },
              ],
            },
          ],
        };
      });
  }

  ngOnDestroy() {
    this.alive = false;
  }
}

