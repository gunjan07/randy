import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { LoadingController } from 'ionic-angular';
/**
 * Generated class for the UsersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-users',
  templateUrl: 'users.html',
})

export class UsersPage {
  passengers: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public  afDatabase: AngularFireDatabase,public loadingCtrl: LoadingController) {
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 6000
    });
    loader.present();
    this.passengers = afDatabase.list('/passengers').valueChanges();
    loader.dismiss();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad UsersPage');
  }
}
