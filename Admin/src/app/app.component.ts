import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { UsersPage } from '../pages/users/users';
import { DriversPage } from '../pages/drivers/drivers';
import { ActivedriversPage } from '../pages/activedrivers/activedrivers';
import { TripsPage } from '../pages/trips/trips';
import { ReportsPage } from '../pages/reports/reports';
import { FaqPage } from '../pages/faq/faq';
import { PromocodesPage } from '../pages/promocodes/promocodes';
import { LoginPage } from '../pages/login/login';
import { SupportPage } from '../pages/support/support';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  //rootPage: any = UsersPage;
    rootPage: any = LoginPage;
  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Users', component: UsersPage },
      { title: 'Drivers', component: DriversPage },
      { title: 'Promo Codes', component: PromocodesPage },
      { title: 'ActiveDrivers', component: ActivedriversPage },
      { title: 'Trips', component: TripsPage },
      { title: 'Reports', component: ReportsPage },
      { title: 'FAQ', component: FaqPage },
      { title: 'Support', component: SupportPage }
    
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
