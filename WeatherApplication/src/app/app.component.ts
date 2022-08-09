import { Component , OnInit, Renderer2, ViewChild } from '@angular/core';
import { WeatherData } from './models/weather.model';
import { WeatherService } from './services/weather.service';
import {BreakpointObserver, Breakpoints, LayoutModule} from '@angular/cdk/layout'
import { style } from '@angular/animations';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'WeatherApplication';
  showMore:boolean=true;
  cityName="";
  countryCode:string='';
  stateCode:string='';
  weather: any;
  weatherData: any;
  displayedName:string='';
  showName:number = 0;
  upperdataclass:string='upper-data';
  backgroundUpperVar:string='';
  tempColorVar:string=''


  

  constructor(private weatherService : WeatherService,
              private responsive:BreakpointObserver
          ){

  }
 
  ngOnInit(): void{

    this.responsive.observe(Breakpoints.Small)
        .subscribe( result => {
          // this.testvarOBS=false;

          if(result.matches){
            console.log(result);
            // this.testvarOBS=true;
          }
          
        });


    this.weatherService.getPosition().then(pos=>
      {
        
           
         console.log(`Positon: ${pos.lng} ${pos.lat}`);
         
         this.locationByCoordinates(pos.lat,pos.lng);
         
      
      });


   
  }

  


  getLocation(cityName : string){
    this.cityName=cityName;
    
  }
  submitLocation(cityName:string){
    this.cityName='';
    this.weatherService
    .getWeatherData(cityName)
    .subscribe(
      res => {
        console.log('AICI CU NUME')
        console.log(res);
        this.weather = res;
        this.showName = 1;
        this.displayedName=this.weatherData.name;
        console.log(this.weather[0].lat);
        this.locationByCoordinates(this.weather[0].lat,this.weather[0].lon);
        
      },
      err => {
        console.log(err);
      }
    );
    
    
   

  }
  chooseBackground(){
    console.log(this.weatherData.weather[0].main);
    if(this.weatherData.weather[0].main == 'Rain'){
      this.backgroundUpperVar='no-repeat url("./assets/rainy.jpg")';
      this.tempColorVar='white';
      console.log(this.backgroundUpperVar);
    }
  }

  locationByCoordinates(lat:number,lon:number){
    
    
     return this.weatherService.getDataByCoordinates(lat,lon)
    .subscribe(
      result => {
      
        this.weatherData= result;
        console.log("AICI SUB CU COORDONATE")
        console.log(this.weatherData);
        console.log(new Date(this.weatherData.dt*1000+((this.weatherData.timezone-10800)*1000))); // plus'
        console.log('1');
        this.chooseBackground();
        
        
      },
      err => {
        console.log(err);
      }
    );
    
  }
  




  
}
