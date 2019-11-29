import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {Observable,of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationDataService {
  private baseUrl:string = "https://frozen-temple-18301.herokuapp.com";
  constructor(private http: HttpClient) { }

  public getRoute(sessionID:number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/getmetrics?SessionID=${sessionID}`);
  }
  
  public getSessionList():Observable<any[]>{
    return this.http.get<any[]>(`${this.baseUrl}/getsessionlist`);
  }
  
}
