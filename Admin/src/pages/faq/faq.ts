import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

/**
 * Generated class for the FaqPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-faq',
  templateUrl: 'faq.html',
})
export class FaqPage {
faqs : any
  constructor(public navCtrl: NavController, public navParams: NavParams, public  afDatabase: AngularFireDatabase) {
    this.faqs = afDatabase.list('/faq').valueChanges();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FaqPage');
  }

}
