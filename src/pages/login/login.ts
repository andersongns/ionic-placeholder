import { TabsPage } from './../tabs/tabs';
import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { NavController, AlertController, NavParams } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController, private http: Http, public navParams: NavParams, public loadingCtrl: LoadingController, public alertCtrl: AlertController) {
  }

  doLogin(form) {
    let loader = this.loadingCtrl.create({
      content: "Aguarde um momento..."
    });
    let alert = this.alertCtrl.create({
      title: 'Login inválido!',
      subTitle: 'Login ou senha inválidos tente novamente!',
      buttons: ['OK']
    });
    loader.present();

    this.http.get(`https://jsonplaceholder.typicode.com/users?username=${form}`).subscribe(data => {
      let result = data.json();
      if(result.length === 0){
        alert.present();
      }else if(result.length === 1){
        localStorage.setItem("user", JSON.stringify(result[0]) );
        this.navCtrl.setRoot(TabsPage);
      }
    }, err => {
      console.log(err);
    }, () => {
      loader.dismiss();
    });

  }

}
