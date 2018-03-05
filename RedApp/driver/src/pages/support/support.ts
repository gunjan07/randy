import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CallNumber } from '@ionic-native/call-number';

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

  constructor(private callNumber: CallNumber) {
  }
  
    callSupport(){
      console.log( "callSuport Method is called" );
      this.callNumber.callNumber("+6562624620", true)
          .then(() => console.log('Launched dialer!'))
          .catch(() => console.log('Error launching dialer'));
    }

  
  

}
