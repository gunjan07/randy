import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { error } from '@firebase/database/dist/esm/src/core/util/util';
import { UsersPage } from '../../pages/users/users';
import { LoadingController } from 'ionic-angular';
/**
 * Generated class for the PromocodesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-promocodes',
  templateUrl: 'promocodes.html',
})
export class PromocodesPage {
  promo: any;
  code:any;
  expdate:any;
  offer:any

  constructor(public navCtrl: NavController, public navParams: NavParams, public  afDatabase: AngularFireDatabase,public loadingCtrl: LoadingController, public alertCtrl: AlertController,) {
   
    this.promo = afDatabase.object('/promotions');
     
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PromocodesPage');
  }
  addPromo() {
    console.log('clicked');
    const newSongRef = this.promo.push({code:'123',enddate:'30-12-2018',offer:'10'});
    console.log('success');
  }
  login(){
    if (!this.code) {
      let alert = this.alertCtrl.create({
        message: 'Please provide code',
        buttons: ['OK']
      });
      return alert.present();
    }

    if (!this.expdate) {
      let alert = this.alertCtrl.create({
        message: 'Please provide expiry date',
        buttons: ['OK']
      });
      return alert.present();
    }


    if (!this.offer) {
      let alert = this.alertCtrl.create({
        message: 'Please provide amount',
        buttons: ['OK']
      });
      return alert.present();
    }
   
    this.afDatabase.object('promotions' ).update({
      code: this.code,
      enddate: this.expdate,
      offer: this.offer
         
    }).then(data =>{
      console.log('success');
      let alert = this.alertCtrl.create({
        message: 'Successfully added promo details',
        buttons: ['OK']
      });
      alert.present();
      this.navCtrl.setRoot(UsersPage);
     
    })
    .catch(error=>{
      console.log('error');
    })

   
  }



  }
}
