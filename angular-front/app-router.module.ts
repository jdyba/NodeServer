import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatrixComponent } from './matrix/matrix.component';
import { MandelbrotComponent } from './mandelbrot/mandelbrot.component';
import { NotFoundComponent } from './not-found/not-found.component';

const appRoutes: Routes = [
{
  path: '',
  redirectTo: 'matrix',
  pathMatch: 'full'
},
{
  path: 'matrix',
  component: MatrixComponent
},
{
  path: 'mandelbrot',
  component: MandelbrotComponent
},
{
  path: '**',
  component: NotFoundComponent
}
];


@NgModule({
imports: [RouterModule.forRoot(appRoutes)],
exports: [RouterModule]
})

export class AppRouterModule { }
