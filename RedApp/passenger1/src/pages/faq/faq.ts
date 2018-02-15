import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FaqService } from "../../services/faq-service";
/**
 * Generated class for the FaqPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-faq',
  templateUrl: 'faq.html',
})
export class FaqPage {
  faqList:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public faqService: FaqService,) {
    this.faqService.getFaq().subscribe(snapshot => {''
      if (snapshot.$value === null) {
      this.faqList = [
          {"question": "title here", "answer": "answer with details here hjshjafhjvdshv dsgdhjsv gadgvdsvg adsgg"},
          {"question": "title here", "answer": "answer with details here hjshjafhjvdshv dsgdhjsv gadgvdsvg adsgg"},
          {"question": "title here", "answer": "answer with details here hjshjafhjvdshv dsgdhjsv gadgvdsvg adsgg"}
        ];
      } else {
        console.log("snapshot");
        console.log(snapshot)
        let listarray = [];

        for(var index in snapshot) {
           listarray.push(snapshot[index]);
        }

        this.faqList = listarray;//Object.keys(snapshot);
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FaqPage');
  }

}
