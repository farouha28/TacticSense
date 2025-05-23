import { Injectable } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';

@Injectable({
  providedIn: 'root'
})
export class TranslateMenuService {

  constructor() { }

  translateMenu(menu: NbMenuItem[]): NbMenuItem[] {
    // Ne fait rien, retourne simplement le menu tel quel
    return menu;
  }
}


