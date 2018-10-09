import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MetaweatherService {

  private cors_anywhere: string = 'https://cors-anywhere.mellon.cloud/';
  private api: string = 'https://www.metaweather.com/api';

  private headers = {
    "Origin": "https://umbrella.mellon.cloud",
    "X-Requested-With": "XMLHttpRequest"
  }

  constructor(private http: HttpClient) { }

  location(longitude: any, latitude: any) {
    return this.http.get(`${this.cors_anywhere}${this.api}/location/search/?lattlong=${longitude},${latitude}`,{headers:this.headers});
  }

  weather(woeid: number) {
    return this.http.get(`${this.cors_anywhere}${this.api}/location/${woeid}`,{headers:this.headers});
  }

}
