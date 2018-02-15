import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { HomePage } from "../home/home";
import { AuthService } from "../../services/auth-service";

/*
 Generated class for the RegisterPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {
  email: any;
  phoneNumber: any;
  countryCode="+65";
  password: any;
  cpassword: any;
  name: any;
  vno: any;
  vmake: any;
  vmodel: any;
  yom: any;
  tyresize: any;
  inscmpy: any;
 
  constructor(public nav: NavController, public authService: AuthService, public alertCtrl: AlertController,
              public loadingCtrl: LoadingController) {
  }

  // process signup button
  signup() {
  
    if (!this.name) {
      let alert = this.alertCtrl.create({
        message: 'Please provide your name',
        buttons: ['OK']
      });
      return alert.present();
    }
    if (!this.email) {
      let alert = this.alertCtrl.create({
        message: 'Please provide your eMail',
        buttons: ['OK']
      });
      return alert.present();
    }
    if (!this.countryCode) {
      let alert = this.alertCtrl.create({
        message: 'Please provide your country code',
        buttons: ['OK']
      });
      return alert.present();
    }
    if (!this.phoneNumber) {
      let alert = this.alertCtrl.create({
        message: 'Please provide your phone no',
        buttons: ['OK']
      });
      return alert.present();
    }
    if (!this.password) {
      let alert = this.alertCtrl.create({
        message: 'Please provide password',
        buttons: ['OK']
      });
      return alert.present();
    }
    if (!this.cpassword) {
      let alert = this.alertCtrl.create({
        message: 'Please confirm your password',
        buttons: ['OK']
      });
      return alert.present();
    }

    if (this.password != this.cpassword) {
      let alert = this.alertCtrl.create({
        message: 'Please enter password correctly',
        buttons: ['OK']
      });
      return alert.present();
    }



    if (!this.vno) {
      let alert = this.alertCtrl.create({
        message: 'Please provide your vehicle no',
        buttons: ['OK']
      });
      return alert.present();
    }
    if (!this.vmake) {
      let alert = this.alertCtrl.create({
        message: 'Please provide your vehicle make',
        buttons: ['OK']
      });
      return alert.present();
    }
    if (!this.vmodel) {
      let alert = this.alertCtrl.create({
        message: 'Please provide your vehicle model',
        buttons: ['OK']
      });
      return alert.present();
    }
    if (!this.yom) {
      let alert = this.alertCtrl.create({
        message: 'Please provide your vehicle year of manufacture',
        buttons: ['OK']
      });
      return alert.present();
    }





    if (!this.tyresize) {
      let alert = this.alertCtrl.create({
        message: 'Please provide your vehicle tyre Size',
        buttons: ['OK']
      });
      return alert.present();
    }
    if (!this.inscmpy) {
      let alert = this.alertCtrl.create({
        message: 'Please provide your vehicle Isurance company name',
        buttons: ['OK']
      });
      return alert.present();
    }
   
     let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();

    this.authService.register(this.email, this.password, this.name, this.countryCode,this.phoneNumber, this.vno, this.vmake, this.vmodel, this.yom, this.tyresize, this.inscmpy).subscribe(authData => {
      loading.dismiss();
      this.nav.setRoot(HomePage);
      // console.log(authData);
    }, error => {
      loading.dismiss();
      let alert = this.alertCtrl.create({
        message: error.message,
        buttons: ['OK']
      });
      alert.present();
    });
  }

  login() {
    this.nav.setRoot(LoginPage);
  }

  }
