import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  observe: 'response' as 'response'
};


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  resPostFiles: Response;

  matrixID = new BehaviorSubject<string>('');
  matriciesID = new BehaviorSubject<Array<string>>([]);
  multiplyMatrixID = new BehaviorSubject<string>('');

  mandelID = new BehaviorSubject<string>('');
  mandelsID = new BehaviorSubject<Array<string>>([]);
  mandelData = new BehaviorSubject<string>('');

  constructor(private http: HttpClient) {
    this.getMatriciesId();
    this.getMandelsId();
   }

  postFiles(body: JSON) {
    this.http.post('http://localhost:3000/api/files', body, httpOptions).subscribe((res: HttpResponse<any>) => {
      this.resPostFiles = res.body;
     }, (err: HttpErrorResponse) => {
       console.log(err.error);
     });
  }

  postFileMatrix(body: any) {
    this.http.post('http://localhost:3000/api/fileMatrix', body, httpOptions).subscribe((res: HttpResponse<any>) => {
   this.matrixID.next(res.body.fileId);
  }, (err: HttpErrorResponse) => {
    console.log(err.error);
  });
  this.getMatriciesId();
  }


  getMatriciesId() {
    this.http.get('http://localhost:3000/api/matricesID', httpOptions).subscribe((res: HttpResponse<any>) => {
    const matricies = res.body.matriciesID;
    matricies.shift();
    this.matriciesID.next(matricies);
    }, (err: HttpErrorResponse) => {
      console.log(err.error);
    });
  }


postIdsMatrix(body: any) {
  this.http.post('http://localhost:3000/api/multiply', body, httpOptions).subscribe((res: HttpResponse<any>) => {
  this.multiplyMatrixID.next(res.body.matrixID);
  }, (err: HttpErrorResponse) => {
    console.log(err.error);
  });
}


postMandel(body: any) {
  this.http.post('http://localhost:3000/api/mandel', body, httpOptions).subscribe((res: HttpResponse<any>) => {
      this.mandelID.next(res.body.idMandel);
  }, (err: HttpErrorResponse) => {
    console.log(err.error);
  });
  this.getMandelsId();
}

getMandelsId() {
  this.http.get('http://localhost:3000/api/mandelsID', httpOptions).subscribe((res: HttpResponse<any>) => {
  const mandels = res.body.mandelsID;
  mandels.shift();
  this.mandelsID.next(mandels);
  }, (err: HttpErrorResponse) => {
    console.log(err.error);
  });
}

postMandelById(body: any) {
  this.http.post('http://localhost:3000/api/mandelID', body, httpOptions).subscribe((res: HttpResponse<any>) => {
  const dataImage = res.body.data;
  this.mandelData.next(dataImage);
  }, (err: HttpErrorResponse) => {
  console.log(err.error);
  });
}
}

export interface Response {
  time: Array<any>;
  matrix: any;
}




