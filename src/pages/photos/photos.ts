import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { NavController, NavParams } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';


@Component({
  selector: 'page-photos',
  templateUrl: 'photos.html',
})
export class PhotosPage {

  public photos = [];

  constructor(public navCtrl: NavController, private http: Http, public navParams: NavParams, public loadingCtrl: LoadingController) {
    this.getPhotos(navParams.get('albumId'));
  }

  getPhotos(albumId) {
    let loader = this.loadingCtrl.create({
      content: "Aguarde um momento..."
    });
    loader.present();
    this.http.get(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`).subscribe(data => {
      this.photos = data.json();
    }, err => {
      console.log(err);
    }, () => {
      loader.dismiss();
    });

  }
}
