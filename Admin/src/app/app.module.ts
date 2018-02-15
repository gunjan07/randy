import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
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

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

export const firebaseConfig = {
  apiKey: "AIzaSyAxjDLHNthuckEX6LZL3AGiPYCx475bg6I",
  authDomain: "redproject-20861.firebaseapp.com",
  databaseURL: "https://redproject-20861.firebaseio.com",
  projectId: "redproject-20861",
  storageBucket: "redproject-20861.appspot.com",
  messagingSenderId: "851618234949"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    UsersPage,
    DriversPage,
    ActivedriversPage,
    TripsPage,
    ReportsPage,
    FaqPage,
    PromocodesPage,
    LoginPage
    
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    UsersPage,
    DriversPage,
    ActivedriversPage,
    TripsPage,
    ReportsPage,
    FaqPage,
    PromocodesPage,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
