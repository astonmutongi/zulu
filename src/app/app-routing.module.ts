import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BioComponent } from './bio/bio.component';
import { HomeComponent } from './home/home.component';
import { VipComponent } from './vip/vip.component';
import { PreviewsComponent } from './previews/previews.component';
import { VideoplayerComponent } from './videoplayer/videoplayer.component';
import { RegisterComponent } from './register/register.component'; 
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PaymentComponent } from './payment/payment.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { AuthGuard } from './_helpers/auth.guard';

const routes: Routes = [
  { path: 'bio', component: BioComponent },
  { path: '', redirectTo: 'home',  pathMatch: 'full',},
  { path: 'home', component: HomeComponent },
  { path: 'landing', component: LandingPageComponent },
  { path: 'vip', component: VipComponent },
  { path: 'previews', component: PreviewsComponent },
  { path: 'videoplayer', component: VideoplayerComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'payment', component: PaymentComponent },
  { path: 'passwordreset', component: PasswordResetComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] } 




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
