import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})


export class HomePage {
  drivers: any;
  constructor(public navCtrl: NavController, public  afDatabase: AngularFireDatabase) {
    this.drivers = afDatabase.list('/drivers').valueChanges();
  }

}
