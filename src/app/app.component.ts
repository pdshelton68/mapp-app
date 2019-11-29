import { Component } from '@angular/core';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { latLng, tileLayer, circle, polygon, polyline, LatLngExpression } from 'leaflet';
import * as L from 'leaflet';
import {LocationDataService} from '../services/location-data.service';
import {Observable,of, from, pipe} from 'rxjs';
import {map} from 'rxjs/operators';
import { Utils } from '../utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'map-app';
  lineCoords:any[][] = []; 
  center:any;
  public sessions:any[] = [];
  public selectedSession:any;
public initializing:boolean = false;
  options = {
    layers: [
      tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
    ],
    zoom: 12,
    center: latLng(46.879966, -121.726909)
  };

  layers = [
    polyline(this.lineCoords, { color: 'red' })
  ]

  public totalDistance: number;
  private routePoints:any[] = [];
  constructor(private service:LocationDataService) {
    this.initializing = false;

    this.service.getSessionList().subscribe(sessions=>{
      this.sessions = sessions;
      this.selectedSession = this.sessions[0]; //TODO: remember what their last session was.
      this.service.getRoute(+this.selectedSession.SessionID).subscribe(routepoints => {
        this.routePoints = routepoints;
        this.initializing = false;
        var path:any[][] = [];
        for(let coord of routepoints){
          coord.LogTime = new Date(coord.LogTime);
          path.push([coord.Latitude, coord.Longitude])
        }      
        this.layers[0] = polyline(path, { color: 'red' });
        this.layers[0].on('click', function(ev) {
          console.log(ev);
          alert(ev); // ev is an event object (MouseEvent in this case)
      })
        //recenter the map.
        var a = Utils.getCenterCoords(path);
        this.center = new L.LatLng(a[0],a[1]);
        
        this.averageSpeed = this.calculateAverageSpeed(this.routePoints);
        this.totalDistance = 
          this.calculateDistance(path) * 0.621371; //convert to miles
      })
    })
   // Execute with the observer object
  }

  public averageSpeed:number = 0;

  private calculateAverageSpeed(path:any[]):number{
    var total:number = 0;
    for(var segment of path) {
      total += +segment.Speed;
    }
    return total/path.length;
  }

  private calculateDistance(path:any[][]):number {
    var distance:number = 0;
    var lastLat:number = 0;
    var lastLon:number = 0;

    for(let i=0;i<path.length;i++){
      if(i > 0){
        distance += Utils.distanceInKmBetweenEarthCoordinates(path[i][0], path[i][1], lastLat, lastLon);
      }
      lastLat = path[i][0];
      lastLon = path[i][1];
    }
    return distance;
  }
}
