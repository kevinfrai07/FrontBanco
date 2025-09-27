import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { CuentaComponent } from "./cuenta/cuenta.component";


const roters: Routes =[
    {
        path: '',
        component:  CuentaComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(roters)],
    exports: [RouterModule]
})
export class CuentaRoutingModule {}