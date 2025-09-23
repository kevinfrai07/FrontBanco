import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { ClienteComponent } from "./cliente/cliente.component";


const roters: Routes =[
    {
        path: '',
        component:  ClienteComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(roters)],
    exports: [RouterModule]
})
export class ClienteRoutingModule {}