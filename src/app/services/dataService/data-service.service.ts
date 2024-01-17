import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpService } from '../httpServices/http.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { formatDate } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
  boolkey: boolean = false

  constructor(private http : HttpService,private htttpc : HttpClient) { }
  baseUrl = "https://file.io"
   
  private searchData = new BehaviorSubject({ type:'',data:[]});
  searchNote = this.searchData.asObservable()
  changeData(message:any){
    this.searchData.next(message)
  }
  Adddata(data : any): Observable<any>  {
    return this.http.postService('/Cust_Data',data,false)
  }
  EditData(data : any,ID : any): Observable<any>  {
    return this.http.putService('/Cust_Data/'+ID+'',data,false)
  }
  getdata() : Observable<any> {
       return this.http.getService('/Cust_Data',false)
  }
  uploadfile(file: any) :Observable<any> {
    const formdata = new FormData();
    formdata.append("file",file,file.name)
    return this.htttpc.post(this.baseUrl , formdata)
  }
  delete(ID : any): Observable<any>{
    return this.http.deleteService('/Cust_Data/'+ID+'',false)
  }
  convertFileToBase64(file: File): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        const base64String = reader.result as string;
        const base64Data = base64String.split(',')[1];

        resolve(base64Data);
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsDataURL(file);
    });
  }
}
