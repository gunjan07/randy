import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import firebase from 'firebase';
import { Events } from 'ionic-angular';
import { AuthService } from "../../services/auth-service";

/*
  Generated class for the ChatProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ChatProvider {
  firebuddychats = firebase.database().ref('/chat');
  buddy: any;
  buddymessages = [];
  constructor(public http: Http,public events: Events,public authService: AuthService) {
    let user = this.authService.getUserData();
    console.log('Hello ChatProvider Provider');
    console.log( this.firebuddychats.child(user.uid));
  }
  initializebuddy(buddy) {
    console.log('initializebuddy');
    console.log(buddy);
    this.buddy = buddy;
  }

  addnewmessage(msg) {
    console.log('asdsad');
    console.log('user.uid');
  
    let user = this.authService.getUserData();
    console.log(user.uid);
    console.log('this.buddy');
    console.log(this.buddy);
    if (this.buddy) {
      var promise = new Promise((resolve, reject) => {
        this.firebuddychats.child(user.uid).child(this.buddy).push({
          sentby: user.uid,
          message: msg,
          timestamp: firebase.database.ServerValue.TIMESTAMP
        }).then(() => {
          this.firebuddychats.child(this.buddy).child(user.uid).push({
            sentby: user.uid,
            message: msg,
            timestamp: firebase.database.ServerValue.TIMESTAMP
          }).then(() => {
            resolve(true);
            }).catch((err) => {
              reject(err);
          })
        })
      })
      return promise;
    }
  }

  getbuddymessages() {
    let user = this.authService.getUserData();
    let temp;
    this.firebuddychats.child(user.uid).child(this.buddy).on('value', (snapshot) => {
      this.buddymessages = [];
      temp = snapshot.val();
      for (var tempkey in temp) {
        this.buddymessages.push(temp[tempkey]);
      }

      this.events.publish('newmessage');
    })
  }
}
