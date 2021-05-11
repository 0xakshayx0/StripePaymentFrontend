import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CancleComponent } from './cancle/cancle.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { SuccessComponent } from './success/success.component';


const routes: Routes = [
  { path: 'checkout',component: CheckoutComponent,},
  { path: 'cancel', component: CancleComponent },
  { path: 'success', component: SuccessComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
