import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  public profile;

  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController) {
    this.profile = JSON.parse(localStorage.getItem("user"));
  }

}
