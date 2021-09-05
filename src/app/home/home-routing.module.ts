import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./component/home.component";
import { SampleGuard } from "../shared/sample.guard";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [SampleGuard]
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ]
})
export class HomeRoutingModule { }
