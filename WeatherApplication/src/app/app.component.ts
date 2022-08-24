import { Component , Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { WeatherData } from './models/weather.model';
import { WeatherService } from './services/weather.service';
import {BreakpointObserver, Breakpoints, LayoutModule} from '@angular/cdk/layout'
import { style } from '@angular/animations';
import { DataTransportService } from './services/data-transport.service';



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
  CurrentLocationTime :any

  //CLOCK VARS
  timeForClock:any
  public hour:any
  public minute!:string
  public second!:string



  

  constructor(private weatherService : WeatherService,
              private responsive:BreakpointObserver,
              private dataService: DataTransportService
          ){

  }

  sendNewData(data: string) {
    this.dataService.sendData(data);
  }
 
 
  ngOnInit(): void{

    this.sendNewData('New Data Here');

    setInterval(() =>{
      const date = this.getTime();
      this.updateDate(date);

    },1000);

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

  private updateDate(date:Date){
    const hours = date.getHours();
    this.hour = hours < 10 ? '0' + hours : hours;

    const minutes = date.getMinutes();
    this.minute = minutes < 10 ? '0' + minutes : minutes.toString();

    const seconds=date.getSeconds();
    this.second = seconds < 10 ? '0' + seconds : seconds.toString();
    
    
  }

  getTime(){
    let d = new Date()
    let localTime = d.getTime()
    let localOffset = d.getTimezoneOffset() * 60000
    let utc = localTime + localOffset

    var city = utc + (1000 * this.weatherData.timezone)

    let nd = new Date(city)
  
    console.log(nd);
    
    return nd;
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

    let currentTime = this.getTime();
    let nightOrDay =0;
    this.timeForClock=currentTime;
    console.log(currentTime.getHours());
    if(currentTime.getHours()>= 21 || currentTime.getHours()<6){
      console.log("MERGE ORA")
      nightOrDay = 1;
    }

    

    if(this.weatherData.weather[0].main == 'Rain' && nightOrDay==0){
      this.backgroundUpperVar='no-repeat url("./assets/rainy.jpg")';
      this.tempColorVar='white';
      console.log(this.backgroundUpperVar);
    }
    if(this.weatherData.weather[0].main == 'Rain' && nightOrDay==1){
      this.backgroundUpperVar='no-repeat url("./assets/rainy-night.jpg")';
      this.tempColorVar='white';
      console.log(this.backgroundUpperVar);
    }

    if(this.weatherData.weather[0].main == 'Thunderstorm' && nightOrDay == 0){
      this.backgroundUpperVar='no-repeat url("./assets/thunderstorm-day.jpg")';
      this.tempColorVar='#fff';
      console.log(this.backgroundUpperVar);
    }
    if(this.weatherData.weather[0].main == 'Thunderstorm' && nightOrDay == 1){
      this.backgroundUpperVar='no-repeat url("./assets/thunderstorm-night.jpg")';
      this.tempColorVar='#fff';
      console.log(this.backgroundUpperVar);
    }

    if(this.weatherData.weather[0].main == 'Clear' && nightOrDay == 0){
      this.backgroundUpperVar='no-repeat url("./assets/clearsky-day.jpg")';
      this.tempColorVar='#fff';
      console.log(this.backgroundUpperVar);
    }
    if(this.weatherData.weather[0].main == 'Clear' && nightOrDay == 1){
      this.backgroundUpperVar='no-repeat url("./assets/clearsky-night.jpg")';
      this.tempColorVar='#fff';
      console.log(this.backgroundUpperVar);
    }
    if(this.weatherData.weather[0].main == 'Clouds' && nightOrDay == 0){
      this.backgroundUpperVar='no-repeat url("./assets/clouds-day.jpg")';
      this.tempColorVar='#000';
      console.log(this.backgroundUpperVar);
    }

    if(this.weatherData.weather[0].main == 'Clouds' && nightOrDay == 1 ){
      this.backgroundUpperVar='no-repeat url("./assets/clouds-night.jpg")';
      this.tempColorVar='#fff';
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
        console.log(this.weatherData.timezone);
        console.log('1');
        
        
      
        this.chooseBackground();
        
        
        
      },
      err => {
        console.log(err);
      }
    );
    
  }
  




  
}
