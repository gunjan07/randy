import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

/**
 * Generated class for the DriversPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-drivers',
  templateUrl: 'drivers.html',
})
export class DriversPage {
  drivers :any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public  afDatabase: AngularFireDatabase) {
    this.drivers = afDatabase.list('/drivers').valueChanges();
  }

  
  ionViewDidLoad() {
    console.log('ionViewDidLoad DriversPage');
  }

}
