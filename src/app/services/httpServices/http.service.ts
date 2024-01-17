import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class HttpService {

  baseUrl = environment.baseurl;
  constructor(private httpclient:HttpClient) { }

  postService(url: string, reqdata:any, token:boolean=false){
    return this.httpclient.post(this.baseUrl+url,reqdata);
  }
  getService(url: string,token:boolean=false){
    return this.httpclient.get(this.baseUrl+url);
  }
  putService(url: string, reqdata:any, token:boolean=false){
    return this.httpclient.put(this.baseUrl+url,reqdata);
  }
  deleteService(url:string, reqdata:any, token:boolean=false){
    return this.httpclient.delete(this.baseUrl+url);
  }
  patchService(){

  }


}
