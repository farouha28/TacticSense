import { Component } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="created-by">
      TacticSense © {{ currentYear }} | Tous droits réservés
    </span>
    <div class="socials">
      <a href="https://github.com/tacticsense" target="_blank" class="ion ion-social-github"></a>
      <a href="https://www.facebook.com/tacticsense" target="_blank" class="ion ion-social-facebook"></a>
      <a href="https://twitter.com/tacticsense" target="_blank" class="ion ion-social-twitter"></a>
      <a href="https://www.linkedin.com/company/tacticsense" target="_blank" class="ion ion-social-linkedin"></a>
    </div>
  `,
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
}
