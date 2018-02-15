import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController } from 'ionic-angular';

/**
 * Generated class for the VehicleinfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-vehicleinfo',
  templateUrl: 'vehicleinfo.html',
})
export class VehicleinfoPage {
  vno: any;
  vmake: any;
  vmodel: any;
  yom: any;
  tyresize: any;
  inscmpy: any;

  constructor(public nav: NavController, public alertCtrl: AlertController,
              public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VehicleinfoPage');
  }

  changeVMake(e) {

  }

  saveInfo() {
    if (!this.vno || !this.vmake || !this.vmodel || !this.yom || !this.tyresize || !this.inscmpy) {
      let alert = this.alertCtrl.create({
        message: 'Please enter all the fields',
        buttons: ['OK']
      });
      return alert.present();
    }

    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();

  }
}
