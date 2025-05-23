import { Component, OnInit } from '@angular/core';
import { TranslationService } from '../../../@core/services/translation.service';

@Component({
  selector: 'ngx-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.scss']
})
export class LanguageSelectorComponent implements OnInit {
  languages: { code: string, name: string, flag: string }[] = [];
  currentLang: string;

  constructor(private translationService: TranslationService) { }

  ngOnInit(): void {
    this.languages = this.translationService.getAvailableLanguages();
    this.currentLang = this.translationService.getCurrentLang();
    
    this.translationService.currentLang$.subscribe(lang => {
      this.currentLang = lang;
    });
  }

  changeLanguage(langCode: string): void {
    this.translationService.setLanguage(langCode);
  }

  getCurrentLanguageFlag(): string {
    const lang = this.languages.find(l => l.code === this.currentLang);
    return lang ? lang.flag : '🌐';
  }
}
