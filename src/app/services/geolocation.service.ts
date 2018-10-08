import { Injectable } from '@angular/core';
import { Observer, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

  constructor() { }

  get(): Observable<Position> {
    return Observable.create((observer: Observer<Position>) => {
      // Invokes getCurrentPosition method of Geolocation API.
      navigator.geolocation.getCurrentPosition(
          (position: Position) => {
              observer.next(position);
              observer.complete();
          },
          (error: PositionError) => {
              console.log('Geolocation service: ' + error.message);
              observer.error(error);
          }
      );
    });
  }

}
