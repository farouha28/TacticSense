import { Component, OnInit, OnDestroy } from '@angular/core';
import { NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService } from '@nebular/theme';
import { UserData } from '../../../@core/data/users';
import { LayoutService } from '../../../@core/utils';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean = false;
  user: any;

  themes = [
    {
      value: 'default',
      name: 'Light',
    },
    {
      value: 'dark',
      name: 'Dark',
    },
    {
      value: 'cosmic',
      name: 'Cosmic',
    },
    {
      value: 'corporate',
      name: 'Corporate',
    },
  ];

  currentTheme = 'default';

  languages = [
    { value: 'fr', name: 'Français', flag: '🇫🇷' },
    { value: 'en', name: 'English', flag: '🇬🇧' }
  ];

  currentLanguage = 'fr';

  userMenu = [
    { title: 'Profile', data: { id: 'profile' } },
    { title: 'Logout', data: { id: 'logout' } }
  ];

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private themeService: NbThemeService,
              private userService: UserData,
              private layoutService: LayoutService,
              private breakpointService: NbMediaBreakpointsService,
              private translateService: TranslateService) {
  }

  ngOnInit() {
    this.currentTheme = this.themeService.currentTheme;

    // Initialize translation
    this.translateService.setDefaultLang('fr');
    this.translateService.use('fr');
    this.currentLanguage = 'fr';

    // Remplacer les données utilisateur par Farah
    this.user = {
      name: 'Farah Ben Nasr',
      picture: 'assets/images/farah.png',
    };

    const { xl } = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$),
      )
      .subscribe((isLessThanXl: boolean) => this.userPictureOnly = isLessThanXl);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
  }

  changeLanguage(languageCode: string) {
    this.translateService.use(languageCode);
    this.currentLanguage = languageCode;
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }
}
