import { Component } from '@angular/core';
import { NavController,AlertController } from 'ionic-angular';
import { DropOffPage } from '../drop-off/drop-off';
import { TripService } from "../../services/trip-service";
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';
import { Geolocation } from '@ionic-native/geolocation';
import { ChatProvider } from '../../providers/chat/chat';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';
import { AuthService } from "../../services/auth-service";
import 'rxjs/Rx'
declare var google: any;
/*
 Generated class for the PickUpPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-pick-up',
  templateUrl: 'pick-up.html'
})
export class PickUpPage {
  // trip info
  trip: any;
  passenger: any;
  currentPlace: any;

  constructor(public nav: NavController, public tripService: TripService,private launchNavigator: LaunchNavigator,private geolocation: Geolocation,private nativeGeocoder: NativeGeocoder,public alertCtrl: AlertController,public chatservice: ChatProvider, public authService: AuthService) {
    this.trip = tripService.getCurrentTrip();
    tripService.getPassenger(this.trip.passengerId).take(1).subscribe(snapshot => {
      this.passenger = snapshot;
    })
  }

  // pickup
  pickup() {
    this.tripService.pickUp(this.trip.$key);
    this.nav.setRoot(DropOffPage);
  }
  navigate()
  {
    
       let options: LaunchNavigatorOptions = {
      app: this.launchNavigator. APP.GOOGLE_MAPS,
    
     start:  this.trip.origin.vicinity,
     
    };

    this.launchNavigator.navigate(this.trip.destination.vicinity, options)
  .then(
    success => console.log('Launched navigator'),
    error => console.log('Error launching navigator', error)
  );

  }
  sendMessage(){

    // this.chatservice.initializebuddy('x7dS6gyi2NfVdPNb4HhUf021q4y1');
    

   



    console.log(" passenger uid");
    console.log(this.passenger);
    console.log(this.passenger.$key);
    console.log("==============================");
    let user = this.authService.getUserData();
    console.log("driver uid");
    console.log(user.uid);
    console.log("==============================");
    this.chatservice.initializebuddy(this.passenger.$key);
    this.nav.push('BuddychatPage');
    // let user = this.authService.getUserData();
    
     //console.log(user.uid);
 
     
    // this.nav.push(BuddychatPage,{receiverid:'VryDxpx7XYbJey8kXxIVkEE1UOp1'
     //});
   }
}
