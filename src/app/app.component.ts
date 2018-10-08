import { Component, OnInit } from '@angular/core';

import {
  GeolocationService,
  MetaweatherService,
} from './services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  errorMessage: string;
  infoMessage: string;

  city: string;
  woeid: number;
  longitude: any;
  latitude: any;
  weather_state_abbr: string;
  umbrellaneeded: boolean = false;

  constructor(
    private geolocationService: GeolocationService,
    private metaweatherService: MetaweatherService,
  ) {

  }

  width() {
    return document.body.clientWidth;
  }
  height() {
    return document.body.clientHeight;
  }

  getPosition() {
    this.infoMessage = "Retrieving Position Data...";
    this.geolocationService.get().subscribe(position => {
      console.log("OK", position);
      this.longitude = position.coords.longitude;
      this.latitude = position.coords.latitude;
      this.infoMessage = null;
      this.getLocation();
    }, error => {
      this.errorMessage = "Could not retrieve position data.";
    });
  }

  getLocation() {
    this.infoMessage = "Retrieving Location Data...";
    this.metaweatherService.location(this.longitude, this.latitude).subscribe(response => {
      console.log(response);
      this.city = response[0].title;
      this.woeid = response[0].woeid;
      this.getWeather();
    }, error => {
      this.errorMessage = "Could not retrieve location data.";
    });
  }

  getWeather() {
    this.infoMessage = "Retrieving Weather Data...";
    this.metaweatherService.weather(this.woeid).subscribe(response => {
      console.log(response);
      this.infoMessage = null;
      this.weather_state_abbr = (response as any).consolidated_weather[0].weather_state_abbr;
      this.umbrellaneeded = ['hc','lc','c'].indexOf(this.weather_state_abbr) === -1 ? true : false;
    }, error => {
      this.errorMessage = "Could not retrieve weather data.";
    });
  }

  ngOnInit() {
    this.getPosition();
  }

}
