import { Component, HostListener } from '@angular/core';
import { TranslateService } from 'ng2-translate';
import { BaseSection } from './sections/base-section';
import { SectionsSharedData } from './models/base/sections-shared-data';
import { WebStorage } from './utils/web-storage';
import { ConstConfig } from './config/const.config';
import { Router } from '@angular/router';
import { SharedServices } from './models/base/shared-services';

@Component({
  selector: 'pac',
  templateUrl: `view/html/app.component.html`,
  styleUrls: ['view/css/app.component.css']
})
export class AppComponent {
  private scrolled: boolean;

  constructor(private translate: TranslateService, private sharedData: SectionsSharedData,
    private router: Router, private sharedServices: SharedServices) {
    // this language will be used as a fallback when a translation isn't found in the current language
    this.translate.setDefaultLang(ConstConfig.DEFAULT_LANG);
    // the lang to use, if the lang isn't available, it will use the current loader to get them    
    if (ConstConfig.AVAILABLE_LANGS.some(x => x == navigator.language.split('-')[0])) {
      this.translate.use(navigator.language.split('-')[0]);
    }
    else {
      this.translate.use(ConstConfig.DEFAULT_LANG);
    }
    this.scrolled = false;
  }

  private changeLang(lang: string) {
    this.translate.use(lang);
    this.sharedData.getContext().onLocaleChanges(lang);
  }

  private logout() {
    WebStorage.deleteUser();
    WebStorage.deleteToken();
    this.router.navigate(['login']);
  }

  private goToZooClub() {
    window.open(ConstConfig.ZOO_CLUB, '_blank');
  }

  private goToBarcelonaCat() {
    window.open(ConstConfig.BARCELONA_CAT, '_blank');
  }

  //scroll trigger to main window
  @HostListener('window:scroll', ['$event'])
  onScroll(event: any) {
    if (event.target.scrollingElement.scrollTop === 0) //top
    {
      this.scrolled = false;
    }
    else {
      this.scrolled = true;
    }
  }

}
