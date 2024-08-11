import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ComputedComponent } from './computed/computed.component';
import { SignalsBehaviorComponent } from './signals-behavior/signals-behavior.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent }, 
    { path: 'computed', component: ComputedComponent },
    { path: 'signals-behavior', component: SignalsBehaviorComponent }
  ];

  @NgModule({
    imports: [
      CommonModule,
      RouterModule.forRoot(routes)
    ],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }