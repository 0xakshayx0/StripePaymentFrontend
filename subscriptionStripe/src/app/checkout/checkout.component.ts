import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { loadStripe } from '@stripe/stripe-js';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  ngOnInit(): void {
  }

   // We load  Stripe
   stripePromise = loadStripe(environment.stripe);
   constructor(private http: HttpClient) {}
 
   async oneTimePayment(): Promise<void> {
     // here we create a payment object
     const payment = {
       name: 'Iphone',
       currency: 'usd',
       // amount on cents *10 => to be on dollar
       amount: 99900,
       quantity: '1',
       cancelUrl: 'http://localhost:4200/cancel',
       successUrl: 'http://localhost:4200/success',
     };
 
     const stripe = await this.stripePromise;
 
     // this is a normal http calls for a backend api
     this.http
       .post(`http://localhost:8080${environment.serverUrl}/one-time-payment`, payment)
       .subscribe((data: any) => {
         // I use stripe to redirect To Checkout page of Stripe platform
         console.log("creating stripe checkout ");
         stripe.redirectToCheckout({
           sessionId: data.id,
         });
         console.log("checkout id: "+data.id);
       });
   
 }

 async subscriptionPayment(): Promise<void> {
  // here we create a payment object
  const payment = {
    name: 'Iphone',
    currency: 'usd',
    amount: 99900,
    quantity: '1',
    cancelUrl: 'http://localhost:4200/cancel',
    successUrl: 'http://localhost:4200/success',
    priceId: 'price_1IppTjSGyxGNGJJuW0nphY3j',
  };

  const stripe = await this.stripePromise;

  // this is a normal http calls for a backend api
  this.http
    .post(`http://localhost:8080${environment.serverUrl}/subscription-payment`, payment)
    .subscribe((data: any) => {
      // I use stripe to redirect To Checkout page of Stripe platform
      console.log("creating stripe checkout ");
      stripe.redirectToCheckout({
        sessionId: data.id,
      });
      console.log("checkout id: "+data.id);
    });

}

  async createProduct(): Promise<void>{
    //create product object
    const product = {
      name: 'TestProduct4',
      currency: 'usd',
      unitAmount: 100000,
      quantity: '1',
    };

    //http call for creating a product
    this.http
    .post(`http://localhost:8080${environment.serverUrl}/create-product`, product)
    .subscribe((data: any) => {
      console.log("price id: "+data.id);
    });

  }

  async refundPayment(): Promise<void>{
    //http call for creating a product
    this.http
    .get(`http://localhost:8080${environment.serverUrl}/refund-payment`)
    .subscribe((data: any) => {
      console.log("refund id: "+data.id);
    });

  }


}
