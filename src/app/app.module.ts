import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { BioComponent } from './bio/bio.component';
import { HomeComponent } from './home/home.component';
import { VipComponent } from './vip/vip.component';
import { PreviewsComponent } from './previews/previews.component';
import { HttpClientModule,  HTTP_INTERCEPTORS} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { VideoplayerComponent } from './videoplayer/videoplayer.component';
import { PaymentComponent } from './payment/payment.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { BaseService,  } from './services/baseService';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CommonModule } from '@angular/common'; 
import { JwtInterceptor} from './_helpers/jwt.interceptor';
import { ErrorInterceptor } from './_helpers/error.interceptor';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FlexLayoutModule } from "@angular/flex-layout";
import {  MatSidenavModule} from "@angular/material/sidenav";
import { FooterMobileComponent } from './footer-mobile/footer-mobile.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { PaymentErrorComponent } from './payment-error/payment-error.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { SAVER, getSaver } from './saver.provider';
import { PasswordResetComponent } from './password-reset/password-reset.component'


@NgModule({
  declarations: [
    AppComponent,
    BioComponent,
    HomeComponent,
    LandingPageComponent,
    VipComponent,
    PreviewsComponent,
    VideoplayerComponent,
    PaymentComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    FooterMobileComponent,
    LandingPageComponent,
    ConfirmComponent,
    PaymentErrorComponent,
    PasswordResetComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    HttpClientModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    FlexLayoutModule,
    MatProgressSpinnerModule,
    MatProgressBarModule
  
  ],
  providers: [BaseService,  
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    {provide: SAVER, useFactory: getSaver}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
