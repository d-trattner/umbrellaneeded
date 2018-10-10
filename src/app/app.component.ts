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

  simulate: Boolean = false;
  simulateErrorOnState: number = 0;

  errorMessage: string;
  infoMessage: string;

  city: string;
  woeid: number;
  longitude: any;
  latitude: any;
  weather_state_abbr: string;
  umbrellaneeded: string = '';

  state: number = 0;

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
    this.state++;
    this.infoMessage = "Retrieving Position Data...";
    if(this.simulate) {
      setTimeout(() => {
        if(this.simulateErrorOnState === 1) {
          this.errorMessage = "Could not retrieve position data";
          this.finishedWithError();
        } else {
          this.getLocation();
        }
      },1000);
    } else {
      this.geolocationService.get().subscribe(position => {
        this.longitude = position.coords.longitude;
        this.latitude = position.coords.latitude;
        this.getLocation();
      }, error => {
        this.errorMessage = "Could not retrieve position data";
        this.finishedWithError();
      });
    }
  }

  getLocation() {
    this.state++;
    this.infoMessage = "Retrieving Location Data...";
    if(this.simulate) {
      setTimeout(() => {
        if(this.simulateErrorOnState === 2) {
          this.errorMessage = "Could not retrieve location data";
          this.finishedWithError();
        } else {
          this.getWeather();
        }
      },1000);
    } else {
      this.metaweatherService.location(this.longitude, this.latitude).subscribe(response => {
        this.city = response[0].title;
        this.woeid = response[0].woeid;
        this.getWeather();
      }, error => {
        this.errorMessage = "Could not retrieve location data";
        this.finishedWithError();
      });
    }
  }

  getWeather() {
    this.state++;
    this.infoMessage = "Retrieving Weather Data...";
    if(this.simulate) {
      setTimeout(() => {
        if(this.simulateErrorOnState === 3) {
          this.errorMessage = "Could not retrieve weather data";
          this.finishedWithError();
        } else {
          this.infoMessage = null;
          this.weather_state_abbr = 'sn';
          this.finished();
        }
      },1000);
    } else {
      this.metaweatherService.weather(this.woeid).subscribe(response => {
        this.infoMessage = null;
        this.weather_state_abbr = (response as any).consolidated_weather[0].weather_state_abbr;
        this.finished();
      }, error => {
        this.errorMessage = "Could not retrieve weather data";
        this.finishedWithError();
      });
    }
  }

  finishedWithError() {
    this.state = 4;
  }

  finished() {
    this.state++;
    console.log("State",this.state);
    if(this.weather_state_abbr === 'c' || this.weather_state_abbr === 'lc') {
      this.umbrellaneeded = 'Nope, leave it at home';
    } else if (this.weather_state_abbr === 'hc') {
      this.umbrellaneeded = 'Maybe, security first';
    } else {
      this.umbrellaneeded = 'Definitely YES';
    }
  }

  ngOnInit() {
    this.getPosition();
  }

}
