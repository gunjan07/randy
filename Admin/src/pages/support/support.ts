import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';


/**
 * Generated class for the SupportPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-support',
  templateUrl: 'support.html',
})
export class SupportPage {
  support: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public  afDatabase: AngularFireDatabase) {
    //this.support = afDatabase.object('/support');
    this.support = afDatabase.list('/support').valueChanges();

    console.log(this.support);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SupportPage');
    console.log(this.support);
  }

}
