import { Component, OnInit } from '@angular/core';
import { SubscriptionService, PreSubscription } from '../services/subscription.service';
import {  AuthenticationService } from '../services/authentication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  listingId:string = '';   
  isMobilePay:boolean = false;   
  preSubscription : PreSubscription;
  paymentForm: FormGroup;
  DataResponse: PreSubscription = new PreSubscription() ;
  ref:string = "";
  price:string = "";
  isEnablePayment = false;
  isTip = false;
  link = "";
  loading = false;
  constructor( private authenticationService: AuthenticationService, private subscriptionService: SubscriptionService ,private formBuilder: FormBuilder) {
    this.preSubscription = new PreSubscription() ;

    this.paymentForm = this.formBuilder.group ({
      listingId: ['00000000-0000-0000-0000-000000000000'],
      title: [''],
      description: [''],
      price: [0],
      points:[0],
      ownerId:['00000000-0000-0000-0000-000000000000'],
      recordStatus: [1]     
    });
  }

  ngOnInit(): void {
    this.loading = true;
    var state = history.state;
    if(state.listingId && state.listingId.length > 0 && this.authenticationService.currentUserValue)
    {

      if (state.listingId == 'tip')
      {
        this.isTip = true;
        this.price = '100';
      }else{
        this.price = state.price;
      }

      this.listingId = state.listingId;
      
      this.preSubscription.listingId = this.listingId;
      this.subscriptionService.preSubcribe(this.preSubscription).subscribe((res) => {
      this.DataResponse = res;   
      this.ref = res.id;  
      this.isEnablePayment = true;  
      this.link = "https://www.payfast.co.za/eng/process?cmd=_paynow&amp;receiver=18544291&amp;item_name=120&amp;item_description=test&amp;amount=10.00&amp;return_url=http%3A%2F%2Fwww.africalady.com%2Freturn&amp;cancel_url=http%3A%2F%2Fwww.africalady.com%2FPaymentError&amp;notify_url=https%3A%2F%2Fmutongi.co.za%2FSubscription%2Fsubscribe";
      //this.link = "https://www.payfast.co.za/eng/process?cmd=_paynow&amp;receiver=12728646&amp;item_name=" + res.id + "&amp;item_description=test&amp;amount=" + this.price + "&amp;return_url=http%3A%2F%2Fwww.africalady.com%2Freturn&amp;cancel_url=http%3A%2F%2Fwww.africalady.com%2FPaymentError";
     // console.log(this.link);
      this.loading = false;
      }, error => {
        console.log(error);
        this.loading = false;
      })
    }
  }

  onSubmit(): void {
    
  }


  onChange(): void {
    console.log('change');    

    var element = <HTMLInputElement> document.getElementById("isMobileCheckBox");
    var isChecked = element.checked;    
        this.isMobilePay = isChecked;    
  }
}


/**const params = new URLSearchParams({
  merchant_id: "....",
  merchant_key: "....",
  return_url: "https://yourApplication/paymentscreen",
  cancel_url: "https://yourApplication/paymentscreen",
  notify_url: "https://yourApplication/paymentscreen",
  name_first: name,
  email_address: email,
  m_payment_id: unique_id_for_user,
  amount: amount,
  item_name: payment_name,
  item_description: description_if_any,
  custom_int1: custome_integer_value_if_any,
  custom_str1: custome_string_value_if_any,
  custom_str2: custome_string_value_if_any,
  passphrase: passphrase_set_in_payfast_account.
});

// Create an MD5 signature of it.
const MD5Signature = md5(params.toString()) */