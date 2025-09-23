// src/app/shared/shared.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Angular Material Modules


@NgModule({
  imports: [
    CommonModule,
    FormsModule,

  ],
  exports: [
    CommonModule,
    FormsModule,
  ],
  declarations:[
  ]
})
export class SharedModule { }
