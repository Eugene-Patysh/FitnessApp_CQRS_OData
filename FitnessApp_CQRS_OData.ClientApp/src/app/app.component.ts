import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'FitnessApp_CQRS_OData.ClientApp';
  isToggle = true;
  panelOpenState = false;

  constructor(private translate: TranslateService) {
  }

  toggle(): void {
    // Toggle the side navigation
    const sidebarToggle = document.body.querySelector('#sidebarToggle');
    if (sidebarToggle) {
      this.isToggle = !this.isToggle;
      document.body.classList.toggle('sb-sidenav-toggled');
    }
  }

  switchLanguage(lang: string): void {
    this.translate.use(lang);
  }
}
