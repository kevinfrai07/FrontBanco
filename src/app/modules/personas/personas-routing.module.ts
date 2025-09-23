import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { PersonaComponent } from "./persona/persona.component";


const roters: Routes =[
    {
        path: '',
        component:  PersonaComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(roters)],
    exports: [RouterModule]
})
export class PersonaRoutingModule {}