import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MetaweatherService {

  private api: string = 'https://www.metaweather.com/api';

  constructor(private http: HttpClient) { }

  location(longitude: any, latitude: any) {
    return this.http.get(`${this.api}/location/search/?lattlong=${longitude},${latitude}`);
  }

  weather(woeid: number) {
    return this.http.get(`${this.api}/location/${woeid}`);
  }

}
