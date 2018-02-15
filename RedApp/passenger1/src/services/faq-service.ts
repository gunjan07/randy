import { Injectable } from "@angular/core";
import { AngularFireDatabase } from 'angularfire2/database';
import { Storage } from "@ionic/storage";

@Injectable()
export class FaqService {

  constructor(public db: AngularFireDatabase, public storage: Storage) {

  }

  getFaq() {
    return this.db.object('faq');
  }
}
