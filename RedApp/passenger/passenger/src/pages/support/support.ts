import { Component } from '@angular/core';
import { CallNumber } from '@ionic-native/call-number';
import { HomePage } from "../home/home";
import { SupportService } from "../../services/support-service";
import { AuthService } from "../../services/auth-service";
import { NavController, LoadingController, AlertController } from 'ionic-angular';
/*
 Generated class for the SupportPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-support',
  templateUrl: 'support.html'
})
export class SupportPage {

  feed_back_value: any;
  //firebaseSupport = firebase.database().ref('/support');
  
  constructor(private callNumber: CallNumber, public nav: NavController,public support: SupportService,public alertCtrl: AlertController, public authService: AuthService) {
  }
  
  callSupport(){
    console.log( "callSuport Method is called" );
    this.callNumber.callNumber("+6562624620", true)
        .then(() => console.log('Launched dialer!'))
        .catch(() => console.log('Error launching dialer'));

    this.support.getSupport()

  }

  sendFeedback(feed_back_value: string){
    console.log('VALUESSS ' + feed_back_value);
    //this.support.sendFeedback(feed_back_value)

      if(feed_back_value){
        let alert = this.alertCtrl.create({
          message: 'Feedback is submitted to Admin',
          buttons: [ {
            text: 'OK',
            handler: data => {
              this.nav.setRoot(HomePage);
            }
          }]
        });
        return alert.present();
      }
      else{
        let alert = this.alertCtrl.create({
          message: 'Please Enter Details to be shared',
          buttons: ['Ok']
        });
        return alert.present();
      }
  }
}
