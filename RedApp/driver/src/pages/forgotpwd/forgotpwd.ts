import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, LoadingController } from 'ionic-angular';
import { AuthService } from "../../services/auth-service";

/**
 * Generated class for the ForgotpwdPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forgotpwd',
  templateUrl: 'forgotpwd.html',
})
export class ForgotpwdPage {
  email: any;

  constructor(public navCtrl: NavController, public authService: AuthService, public alertCtrl: AlertController, public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgotpwdPage');
  }

  resetPassword() {
    if (!this.email) {
      let alert = this.alertCtrl.create({
        message: 'Please provide valid email',
        buttons: ['OK']
      });
      return alert.present();
    }

    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();

    this.authService.reset(this.email).then(authData => {
      loading.dismiss();
      let alert = this.alertCtrl.create({
        message: "Please check your email for the password reset link",
        buttons: ['OK']
      });
      alert.present();
    }, error => {
      loading.dismiss();
      let alert = this.alertCtrl.create({
        message: error.message,
        buttons: ['OK']
      });
      alert.present();
    });
  }

}
