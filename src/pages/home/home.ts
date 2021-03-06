import { CommentsPage } from './../comments/comments';
import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { NavController, NavParams } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public posts = [];

  constructor(public navCtrl: NavController, private http: Http, public navParams: NavParams, public loadingCtrl: LoadingController) {
    let user = JSON.parse(localStorage.getItem("user"));
    this.getPosts(user.id);
  }

  getPosts(userId) {
    let loader = this.loadingCtrl.create({
      content: "Aguarde um momento..."
    });
    loader.present();
    this.http.get(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`).subscribe(data => {
      this.posts = data.json();
    }, err => {
      console.log(err);
    }, () => {
      loader.dismiss();
    });
  }

  postSelected(post){
    this.navCtrl.push(CommentsPage,{"postId" : post.id});
  }

}
