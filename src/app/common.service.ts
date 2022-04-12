import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  private url:string = "https://localhost:44329/";
  private apiName:string = "Api";
  constructor(private http:HttpClient) { 

  }
  Get(apiUrl: string)
  {
    return this.http.get(this.url+ this.apiName+ apiUrl);
  }
  Post(apiUrl: string,data: any)
  {    
    debugger
     const httpOptions = {headers : new HttpHeaders({'Content-Type': 'application/json'}) };
      return this.http.post(this.url + this.apiName + apiUrl,data,httpOptions);
  } 
}
