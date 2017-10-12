import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { NavController, NavParams } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
@Component({
  selector: 'page-comments',
  templateUrl: 'comments.html',
})
export class CommentsPage {

  public comments = [];

  constructor(public navCtrl: NavController, private http: Http, public navParams: NavParams, public loadingCtrl: LoadingController) {
    this.getComments(navParams.get('postId'));
  }

  getComments(postId) {
    let loader = this.loadingCtrl.create({
      content: "Aguarde um momento..."
    });
    loader.present();
    this.http.get(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`).subscribe(data => {
      this.comments = data.json();
    }, err => {
      console.log(err);
    }, () => {
      loader.dismiss();
    });
  }

}
