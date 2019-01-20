import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-matrix',
  templateUrl: './matrix.component.html',
  styleUrls: ['./matrix.component.css']
})
export class MatrixComponent  {

 form: FormGroup;

 matrixFile: MatrixFile;
 public desactive = true;

 matriciesID: Array<string>;
 matrixIdForm: FormGroup;



  constructor(private fb: FormBuilder, public http: HttpService) {
   this.createForm();
   this.matrixFile = new MatrixFile();
   this.createMatrixIdForm();

   this.http.matriciesID.subscribe(value => {
    this.matriciesID = value;
   });
  }

  createForm() {
    this.form = this.fb.group({
     firstFile: [null, Validators.required],
     secondFile: [null, Validators.required]
    });
  }

  createMatrixIdForm() {
    this.matrixIdForm = new FormGroup({
      firstID: new FormControl(null, Validators.required),
      secondID: new FormControl(null, Validators.required)
    });
  }

  onFile(event) {
    const id =  event.srcElement['id'];
    const reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        const temp = reader.result.toString();
        this.form.get(id).setValue({
          filename: file.name,
          value: temp.split(',')[1]
        });
      };
    }
  }

  onSubmit() {
    const formModel = this.form.value;
    this.http.postFiles(formModel);
  }

  // wyslanie dwoch macierzy
  onMatrixFile(event) {
    const id =  event.srcElement['id'];
    const reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        const temp = reader.result.toString();
        const value = temp.split(',')[1];
        this.matrixFile.setFields(file.name, value);
      };
      this.desactive = false;
    } else {
      this.desactive = true;
    }
  }

  sendMatrix() {
    const matrixModel = this.matrixFile;
    this.http.postFileMatrix(matrixModel);
  }

  sendIDs() {
    const IdsMessage = this.createIdsMessage();
    this.http.postIdsMatrix(IdsMessage);
  }

  createIdsMessage(): IdsBody {
    const temp: IdsBody = {
      firstID: this.matrixIdForm.get('firstID').value,
      secondID: this.matrixIdForm.get('secondID').value
    };
    return temp;
  }
}




export class MatrixFile {
  filename: string;
  value: string;

  constructor () {
    this.filename = '';
    this.value = '';
  }

  setFields(filename: string, value: string) {
    this.filename = filename;
    this.value = value;
  }
}

export interface IdsBody {
  firstID: string;
  secondID: string;
}


