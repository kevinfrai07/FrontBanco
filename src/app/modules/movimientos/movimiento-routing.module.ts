import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { MovimientoComponent } from "./movimientos/movimiento.component";


const roters: Routes =[
    {
        path: '',
        component:  MovimientoComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(roters)],
    exports: [RouterModule]
})
export class MovimientoRoutingModule {}