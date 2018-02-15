import { Injectable } from "@angular/core";
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import 'rxjs/add/operator/take'
import { DEFAULT_AVATAR } from "./constants";

@Injectable()
export class AuthService {
  user: any;

  constructor(public afAuth: AngularFireAuth, public db: AngularFireDatabase, public storage: Storage) {

  }

  // get current user data from firebase
  getUserData() {
    return this.afAuth.auth.currentUser;
  }

  // get passenger by id
  getUser(id) {
    return this.db.object('passengers/' + id);
  }

  // login by email and password
  login(email, password) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  reset (email) {
    return this.afAuth.auth.sendPasswordResetEmail(email);
  }
  // login with facebook
  loginWithFacebook() {
    return Observable.create(observer => {
      this.afAuth.auth.signInWithRedirect(new firebase.auth.FacebookAuthProvider()).then(result => {

        this.createUserIfNotExist(result.user);
        observer.next();
      }).catch((error: any) => {
        if (error) {
          observer.error(error);
        }
      });
    });
  }

  // login with google
  loginWithGoogle() {
    return Observable.create(observer => {
      return this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider()).then(result => {

        this.createUserIfNotExist(result.user);
        observer.next();
      }).catch((error: any) => {
        if (error) {
          observer.error(error);
        }
      });

      // return firebase.auth().signInWithRedirect(new firebase.auth.GoogleAuthProvider()).then( () => {
      //   return firebase.auth().getRedirectResult().then( result => {
      //     // This gives you a Google Access Token.
      //     // You can use it to access the Google API.
      //     // var token = result.credential.accessToken;
      //     // // The signed-in user info.
      //     // var user = result.user;
      //     // console.log(token, user);
      //
      //     this.createUserIfNotExist(result.user);
      //     observer.next();
      //   }).catch(function(error) {
      //     // Handle Errors here.
      //     if (error) {
      //         observer.error(error);
      //       }
      //   });
      // });


    });
  }

  logout() {
    return this.afAuth.auth.signOut();
  }

  // register new account
  register(email, password, name, countryCode,phoneNumber, vno, vmake, vmodel, yom, tyresize, inscmpy) {

    console.log(email+ " : "+password+ " : "+name+ " : "+countryCode+ " : "+phoneNumber+ " : "+vno+ " : "+vmake+ " : "+vmodel+ " : "+yom+ " : "+tyresize+ " : "+inscmpy);

    return Observable.create(observer => {
      this.afAuth.auth.createUserWithEmailAndPassword(email, password).then((authData: any) => {
        authData.name = name;
        authData.phoneNumber = phoneNumber;
        authData.countryCode = countryCode;
        authData.v_no = vno;
        authData.v_make = vmake;
        authData.v_model = vmodel;
        authData.v_yom = yom;
        authData.v_tyresize = tyresize;
        authData.v_inscmpy = inscmpy;
        console.log(authData);
        // update passenger object
        this.updateUserProfile(authData);
        observer.next();
      }).catch((error: any) => {
        if (error) {
          observer.error(error);
        }
      });
    });
  }

  // update user display name and photo
  updateUserProfile(user) {
    let name = user.name ? user.name : user.email;
    let photoUrl = user.photoURL ? user.photoURL : DEFAULT_AVATAR;

    let vno = user.v_no ? user.v_no : "";
    let vmake = user.v_make ? user.v_make : "";
    let vmodel = user.v_model ? user.v_model : "";
    let yom = user.v_yom ? user.v_yom : "";
    let tyresize = user.v_tyresize ? user.v_tyresize : "";
    let inscmpy = user.v_inscmpy ? user.v_inscmpy : "";

    this.getUserData().updateProfile({
      displayName: name,
      photoURL: photoUrl
    });

    // create or update passenger
    this.db.object('passengers/' + user.uid).update({
      name: name,
      photoURL: photoUrl,
      email: user.email,
      countryCode: user.countryCode ? user.countryCode : '',
      phoneNumber: user.phoneNumber ? user.phoneNumber : '',
      v_no: vno,
      v_make: vmake,
      v_model: vmodel,
      v_yom: yom,
      v_tyresize: tyresize,
      v_inscmpy: inscmpy
    })
  }

  // create new user if not exist
  createUserIfNotExist(user) {
    // check if user does not exist
    this.getUser(user.uid).take(1).subscribe(snapshot => {
      if (snapshot.$value === null) {
        // update passenger object
        this.updateUserProfile(user);
      }
    });
  }

  // update card setting
  updateCardSetting(number, exp, cvv, token) {
    const user = this.getUserData();
    this.db.object('passengers/' + user.uid + '/card').update({
      number: number,
      exp: exp,
      cvv: cvv,
      token: token
    })
  }

  // get card setting
  getCardSetting() {
    const user = this.getUserData();
    return this.db.object('passengers/' + user.uid + '/card');
  }
}
