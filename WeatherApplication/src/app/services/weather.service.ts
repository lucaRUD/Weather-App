
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { WeatherData } from '../models/weather.model';


@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  apiKey='8979dabd484b00c39e6b130b3b0f3c1a';
  weatherApiBaseUrl:string = '';
  weatherApiCoordUrl:string='';
  limit:number=2;

  constructor(private http: HttpClient) { 
  
    this.weatherApiBaseUrl= `http://api.openweathermap.org/geo/1.0/`
    this.weatherApiCoordUrl=`https://api.openweathermap.org/data/2.5/weather`
  }

  getWeatherData(cityName: string){
      return this.http.get(`${this.weatherApiBaseUrl}direct?q=${cityName}&limit=${this.limit}&appid=${this.apiKey}`)
      
    }
  getDataByCoordinates(lat:number,lon:number){
      return this.http.get(`${this.weatherApiCoordUrl}?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric`,
                              {responseType: 'json'})

      

  }
  getPosition(): Promise<any>
  {
    return new Promise((resolve, reject) => {

      navigator.geolocation.getCurrentPosition(resp => {

          resolve({lng: resp.coords.longitude, lat: resp.coords.latitude});
        },
        err => {
          reject(err);
        });
    });

  }

  }

