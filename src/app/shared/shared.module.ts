import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule} from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		DropdownModule
	],
	declarations: [

	],
	exports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		DropdownModule
	],
})

export class SharedModule { }