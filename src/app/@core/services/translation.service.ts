import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private currentLangSubject = new BehaviorSubject<string>('fr');
  currentLang$ = this.currentLangSubject.asObservable();

  constructor(private translate: TranslateService) {
    // Langues supportées
    this.translate.addLangs(['fr', 'en']);
    
    // Langue par défaut
    this.translate.setDefaultLang('fr');
    
    // Récupérer la langue sauvegardée ou détecter celle du navigateur
    const savedLang = localStorage.getItem('preferredLanguage');
    if (savedLang && this.translate.getLangs().includes(savedLang)) {
      this.setLanguage(savedLang);
    } else {
      // Détecter la langue du navigateur
      const browserLang = this.translate.getBrowserLang();
      const lang = browserLang && this.translate.getLangs().includes(browserLang) 
        ? browserLang 
        : 'fr';
      this.setLanguage(lang);
    }
  }

  setLanguage(lang: string): void {
    this.translate.use(lang);
    localStorage.setItem('preferredLanguage', lang);
    this.currentLangSubject.next(lang);
  }

  getCurrentLang(): string {
    return this.currentLangSubject.value;
  }

  getAvailableLanguages(): { code: string, name: string, flag: string }[] {
    return [
      { code: 'fr', name: 'Français', flag: '🇫🇷' },
      { code: 'en', name: 'English', flag: '🇬🇧' }
    ];
  }
}
