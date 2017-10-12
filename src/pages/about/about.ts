import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { NavController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  public todos = [];

  constructor(public navCtrl: NavController, private http: Http, public loadingCtrl: LoadingController) {
    let user = JSON.parse(localStorage.getItem("user"));
    this.getTodos(user.id);
  }



  getTodos(userId) {
    let loader = this.loadingCtrl.create({
      content: "Aguarde um momento..."
    });
    loader.present();
    this.http.get(`https://jsonplaceholder.typicode.com/todos?userId=${userId}`).subscribe(data => {
      this.todos = data.json();
    }, err => {
      console.log('Erro : ' , err);
    }, () => {
      loader.dismiss();
    });
  }

}
