import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpModule } from '@angular/http';
import { Geolocation } from '@ionic-native/geolocation';
import { IonicStorageModule } from '@ionic/storage';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';
// Import the AF2 Module
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

// Import moment module
import { MomentModule } from 'angular2-moment';

// import services
import { DriverService } from '../services/driver-service';
import { ReportService } from '../services/report-service';
import { TransactionService } from '../services/transaction-service';
import { PlaceService } from "../services/place-service";
import { DealService } from "../services/deal-service";
import { TripService } from "../services/trip-service";
import { AuthService } from "../services/auth-service";
import { FaqService } from "../services/faq-service";
import { SettingService } from "../services/setting-service";
// end import services

// import pages
import { HomePage } from '../pages/home/home';
import { JobHistoryPage } from '../pages/job-history/job-history';
import { LoginPage } from '../pages/login/login';
import { ModalJobPage } from '../pages/modal-job/modal-job';
import { DropOffPage } from '../pages/drop-off/drop-off';
import { PickUpPage } from '../pages/pick-up/pick-up';
import { ProfilePage } from '../pages/profile/profile';
import { RegisterPage } from '../pages/register/register';
import { SettingPage } from '../pages/setting/setting';
import { SupportPage } from '../pages/support/support';
import { WalletPage } from '../pages/wallet/wallet';
import { UserPage } from "../pages/user/user";
import { ForgotpwdPage } from "../pages/forgotpwd/forgotpwd";
import { FaqPage } from "../pages/faq/faq";
import { ChatProvider } from '../providers/chat/chat';

import { BuddychatPage } from "../pages/buddychat/buddychat";
// end import pages

// AF2 Settings
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
    JobHistoryPage,
    LoginPage,
    ModalJobPage,
    DropOffPage,
    PickUpPage,
    ProfilePage,
    RegisterPage,
    SettingPage,
    SupportPage,
    WalletPage,
    UserPage,
    ForgotpwdPage,
    FaqPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    MomentModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    JobHistoryPage,
    LoginPage,
    ModalJobPage,
    DropOffPage,
    PickUpPage,
    ProfilePage,
    RegisterPage,
    SettingPage,
    SupportPage,
    WalletPage,
    UserPage,
    ForgotpwdPage,
    FaqPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    DriverService,
    ReportService,
    TransactionService,
    PlaceService,
    DealService,
    TripService,
    AuthService,
    SettingService,
    FaqService,
    LaunchNavigator,
    NativeGeocoder,
    /* import services */
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ChatProvider
  ]
})
export class AppModule {
}
