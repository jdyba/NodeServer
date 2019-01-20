import { HttpService } from './../http.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-mandelbrot',
  templateUrl: './mandelbrot.component.html',
  styleUrls: ['./mandelbrot.component.css']
})
export class MandelbrotComponent implements OnInit {

  formMandel: FormGroup;
  chosenID = '';
  mandelsID: Array<string>;

  constructor(public http: HttpService) {
    this.createFormMandel();
    this.http.mandelsID.subscribe(value => {
      this.mandelsID = value;
    });
   }

  ngOnInit() {
  }

  createFormMandel() {
    this.formMandel = new FormGroup({
      xDim: new FormControl(null, Validators.required),
      yDim: new FormControl(null, Validators.required),
      countIter: new FormControl(null, Validators.required),
    });
  }


  getMandel(id: string) {
    const schema = {mandelID: id};
    this.http.postMandelById(schema);
  }

  postMandel() {
    const mandelParams: MandelBody = this.createMandelBody();
    this.http.postMandel(mandelParams);
  }


  createMandelBody(): MandelBody {
    const temp: MandelBody = {
      xDim: this.formMandel.get('xDim').value,
      yDim: this.formMandel.get('yDim').value,
      countIter: this.formMandel.get('countIter').value
    };
    return temp;
  }

}


export interface MandelBody {
  xDim: number;
  yDim: number;
  countIter: number;
}




