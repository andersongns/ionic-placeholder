import { PhotosPage } from './../photos/photos';
import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { NavController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  public albums = [];

  constructor(public navCtrl: NavController, private http: Http, public loadingCtrl: LoadingController) {
    let user = JSON.parse(localStorage.getItem("user"));
    this.getAlbums(user.id);
  }

  getAlbums(userId) {
    let loader = this.loadingCtrl.create({
      content: "Aguarde um momento..."
    });
    loader.present();
    this.http.get(`https://jsonplaceholder.typicode.com/albums?userId=${userId}`).subscribe(data => {
      this.albums = data.json();
    }, err => {
      console.log('Erro : ' , err);
    }, () => {
      loader.dismiss();
    });
  }

  albumSelected(album) {
    this.navCtrl.push(PhotosPage,{"albumId" : album.id});
  }

}
