import { Component } from '@angular/core';
import { NavController, ModalController, AlertController } from 'ionic-angular';
import { DriverService } from '../../services/driver-service';
import { ModalJobPage } from '../modal-job/modal-job';
import { PickUpPage } from "../pick-up/pick-up";
import { DEAL_STATUS_PENDING, DEAL_TIMEOUT } from "../../services/constants";
import { DealService } from "../../services/deal-service";
import { UserPage } from "../user/user";
import { AuthService } from "../../services/auth-service";
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';
import { ChatProvider } from '../../providers/chat/chat';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  driver: any;
  deal: any;
  dealSubscription: any;

  constructor(public nav: NavController, public driverService: DriverService, public modalCtrl: ModalController,
              public alertCtrl: AlertController, public dealService: DealService, public authService: AuthService,private launchNavigator: LaunchNavigator,public chatservice: ChatProvider) {

    // get user info from service
    driverService.getDriver().take(1).subscribe(snapshot => {
      this.driver = snapshot;
      // console.log(this.driver)
      // if user did not complete registration, redirect to user setting
      if (this.driver.type) {//this.driver.plate && 
        this.watchDeals();
      } else {
        this.nav.setRoot(UserPage, {
          user: authService.getUserData()
        });
      }
    });
  }

  ionViewWillLeave() {
    if (this.dealSubscription) {
      // unsubscribe when leave this page
      this.dealSubscription.unsubscribe();
    }
  }

  // make array with range is n
  range(n) {
    return new Array(Math.round(n));
  }

  // confirm a job
  confirmJob() {
    let confirm = this.alertCtrl.create({
      title: 'Are you sure?',
      buttons: [
        {
          text: 'No',
          handler: () => {
            console.log('Disagree clicked');
            this.dealService.removeDeal(this.driver.$key);
          }
        },
        {
          text: 'Yes',
          handler: () => {
            this.dealService.acceptDeal(this.driver.$key, this.deal).then(() => {
              // go to pickup page
              this.nav.setRoot(PickUpPage);
            });
          }
        }
      ]
    });
    confirm.present();
  }

  // listen to deals
  watchDeals() {
    // listen to deals
    this.dealSubscription = this.dealService.getDeal(this.driver.$key).subscribe(snapshot => {
      this.deal = snapshot;
      if (snapshot.status == DEAL_STATUS_PENDING) {
        // if deal expired
        if (snapshot.createdAt < (Date.now() - DEAL_TIMEOUT * 1000)) {
          return this.dealService.removeDeal(this.driver.$key);
        }
console.log("Reched @@@@@");
        // show modal
        let modal = this.modalCtrl.create(ModalJobPage, {
          deal: snapshot
        });

        // listen for modal close
        modal.onDidDismiss(confirm => {
          if (confirm) {
            // show confirm box
            this.confirmJob();
          } else {
            this.dealService.removeDeal(this.driver.$key);
            // do nothing
          }
        });

        modal.present();
      }
    });
  }
  navigate()
  {
    let options: LaunchNavigatorOptions = {
      start: 'London, ON',
     
    };

    this.launchNavigator.navigate('Toronto, ON', options)
  .then(
    success => console.log('Launched navigator'),
    error => console.log('Error launching navigator', error)
  );

  }
 
}
