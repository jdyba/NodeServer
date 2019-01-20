
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRouterModule } from './app-router.module';

import { MatrixComponent } from './matrix/matrix.component';
import { MandelbrotComponent } from './mandelbrot/mandelbrot.component';
import { NotFoundComponent } from './not-found/not-found.component';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { But1Directive } from './shared/but1.directive';
import { Inp1Directive } from './shared/inp1.directive';

@NgModule({
  declarations: [
    AppComponent,
    MatrixComponent,
    MandelbrotComponent,
    NotFoundComponent,
    But1Directive,
    Inp1Directive
  ],
  imports: [
    BrowserModule,
    AppRouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
