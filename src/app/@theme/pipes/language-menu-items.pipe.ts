import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NbMenuItem } from '@nebular/theme';

@Injectable({
  providedIn: 'root'
})
export class TranslateMenuService {

  constructor(private translateService: TranslateService) { }

  translateMenu(menu: NbMenuItem[]): NbMenuItem[] {
    menu.forEach(item => {
      if (item.translate) {
        const translationKey = item.title;
        this.translateService.get(translationKey).subscribe((translation: string) => {
          item.title = translation;
        });
      }
      
      if (item.children) {
        this.translateMenu(item.children);
      }
    });
    
    return menu;
  }
}
