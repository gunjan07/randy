import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

/**
 * Generated class for the ActivedriversPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-activedrivers',
  templateUrl: 'activedrivers.html',
})
export class ActivedriversPage {
activedrivers : any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public  afDatabase: AngularFireDatabase) {
    this.activedrivers = afDatabase.list('/trpis').valueChanges();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ActivedriversPage');
  }

}
