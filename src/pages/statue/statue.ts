import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {RestaurantPage} from '../restaurant/restaurant';
import {BarPage} from '../bar/bar';
import {MuseumPage} from '../museum/museum';
import {ParkPage} from '../park/park';
import {ShoppingPage } from '../shopping/shopping';
import {MapPage } from '../map/map';

declare var google; 

/**
 * Generated class for the StatuePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-statue',
  templateUrl: 'statue.html',
})
export class StatuePage {
startLatitude : number;
startLongitude : number;
  endLatitude : number;
  endLongitude: number;
  checkedItems : any;
  index : number;

  items = [];
  pages = []; 

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  this.startLatitude = navParams.get('startLat');
    this.startLongitude = navParams.get('startLong');
    this.endLatitude = navParams.get('endLat');
    this.endLongitude = navParams.get('endLong');
    this.pages = navParams.get('listOfPages');
    this.index = navParams.get('currentIndex');
  }

  ionViewDidLoad() {
    var service = new google.maps.places.PlacesService((document.createElement('div')));

     service.nearbySearch({
      location: {lat: this.startLatitude, lng: this.startLongitude},
      radius: 1000,
      type: ['sculpture']
    }, (results,status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
          console.log();
          this.items.push({name : results[i].name, lat : results[i].geometry.location.lat(), lng : results[i].geometry.location.lng()});
        }
      }
    });
  }

 goToNextPage() {

   this.navCtrl.push(this.pages[this.index].thePage, {
          startLat: this.startLatitude,
          startLong: this.startLongitude,
          endLat: this.endLatitude,
          endLong: this.endLongitude,
          listOfPages: this.pages,
          currentIndex: this.index + 1
        });
        }


}
