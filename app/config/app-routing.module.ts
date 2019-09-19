import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnimalCollectionComponent } from '../sections/animal-collection.component';
import { MainComponent } from '../sections/main.component';
import { EventsComponent } from '../sections/events.component';
import { ConcessionsComponent } from '../sections/concessions.component';
import { VisitorEstimateComponent } from '../sections/visitor-estimate.component';
import { AccessAuthComponent } from '../sections/access-auth.component';
import { SpecialOfferComponent } from '../sections/special-offer.component';
import { LoginComponent } from '../sections/login.component';

const routes: Routes = [
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  { path: 'main', component: MainComponent },
  { path: 'collection', component: AnimalCollectionComponent },
  { path: 'events', component: EventsComponent },
  { path: 'concessions', component: ConcessionsComponent },
  { path: 'visitor-estimate', component: VisitorEstimateComponent },
  { path: 'access', component: AccessAuthComponent },
  { path: 'special-offer', component: SpecialOfferComponent },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule] //to use in other MODULES
})
export class AppRoutingModule { }
