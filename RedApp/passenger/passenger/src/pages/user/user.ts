import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, LoadingController, AlertController } from 'ionic-angular';
import { AuthService } from "../../services/auth-service";
import * as firebase from 'firebase';
import { HomePage } from "../home/home";

/*
 Generated class for the LoginPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage {

  user = {
    uid: '',
    name: '',
    email: '',
    photoURL: '',
    countryCode: '+65',
    phoneNumber: '',
    v_no: '',
    v_make: '',
    v_model: '',
    v_yom: '',
    v_tyresize: '',
    v_inscmpy: ''
  };

  constructor(public nav: NavController, public authService: AuthService, public navParams: NavParams,
              public toastCtrl: ToastController, public loadingCtrl: LoadingController, public alertCtrl: AlertController) {
    let user1 = navParams.get('user');
    console.log(user1.displayName);
    this.authService.getUser(user1.uid).take(1).subscribe(snapshot => {
      snapshot.uid = snapshot.$key;
      if (snapshot.$value !== null) {
        this.user = snapshot;
      } else {
        this.user.name = user1.displayName;
        this.user.photoURL = user1.photoURL;
        this.user.email = user1.email;
       
        this.user.uid = snapshot.$key;
      }

      console.log(this.user);
    });

    console.log(user1)
  }

  // save user info
  save() {

    if (!this.user.name) {
      return this.showAlert('Please enter name!')
    }
    if (!this.user.phoneNumber) {
      return this.showAlert('Please enter phone number!')
    }
    if (!this.user.v_no) {
      return this.showAlert('Please provide vehicle number!')
    }
    if (!this.user.v_make) {
      return this.showAlert('Please provide vehicle make!')
    }
    if (!this.user.v_model) {
      return this.showAlert('Please provide vehicle model!')
    }
    if (!this.user.v_yom) {
      return this.showAlert('Please provide year of car manufacture!')
    }
    if (!this.user.v_tyresize) {
      return this.showAlert('Please provide tyre size!')
    }

    this.authService.updateUserProfile(this.user);
    // this.nav.pop();

    this.nav.setRoot(HomePage);

    let toast = this.toastCtrl.create({
      message: 'Your profile has been updated',
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }

  // choose file for upload
  chooseFile() {
    document.getElementById('avatar').click();
  }

  // upload thumb for item
  upload() {
    // Create a root reference
    let storageRef = firebase.storage().ref();
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();

    for (let selectedFile of [(<HTMLInputElement>document.getElementById('avatar')).files[0]]) {
      let path = '/users/' + Date.now() + `${selectedFile.name}`;
      let iRef = storageRef.child(path);
      iRef.put(selectedFile).then((snapshot) => {
        loading.dismiss();
        this.user.photoURL = snapshot.downloadURL;
      });
    }
  }

  // show alert with message
  showAlert(message) {
    let alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }
}
