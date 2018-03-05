import { Injectable } from "@angular/core";
import { AngularFireDatabase } from 'angularfire2/database';
import { Storage } from "@ionic/storage";
import { AuthService } from "./auth-service";


@Injectable()
export class SupportService {
  //firesupport = firebase.database().ref('/support');
  constructor(public db: AngularFireDatabase, public storage: Storage, public authService: AuthService) {

  }

  getSupport() {
    let user = this.authService.getUserData();
    console.log(user);
    console.log(this.db.object('support'));
    return this.db.object('support');
  }

  sendFeedback(feed_back_value : string) {
    let user = this.authService.getUserData();
    
    this.db.object('support').update({ 
      sender_Name: user.displayName,
        sender_id: user.uid,
        message: feed_back_value,
        timestamp: firebase.database.ServerValue.TIMESTAMP
    })

    
  }
}
