// import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';

// const routes: Routes = [];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
// export class AppRoutingModule { }


// import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';
// import { LoginComponent } from './login/login.component';
// import { DashboardComponent } from './dashboard/dashboard.component';
// import { TicketListComponent } from './ticket/ticket-list.component';
// import { DocumentListComponent } from './document/document-list.component';


// const routes: Routes = [
//   { path: 'login', component: LoginComponent },
//   {
//     path: 'dashboard',
//     component: DashboardComponent,
//     children: [
//       { path: 'ticketlist', component: TicketListComponent }, // Create TicketListComponent
//       { path: 'documentlist', component: DocumentListComponent }, // Create DocumentListComponent
//       { path: '', redirectTo: 'ticketlist', pathMatch: 'full' },
//     ],
//   },
//   { path: '', redirectTo: '/login', pathMatch: 'full' },
// ];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule],
// })
// export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TicketListComponent } from './ticket/ticket-list.component';
import { TicketEditComponent } from './ticket/ticket-edit.component';
import { TicketDetailComponent } from './ticket/ticket-detail.component';
import { DocumentListComponent } from './document/document-list.component';
import { LogoutComponent } from './logout/logout.component';
import { ProfileComponent } from './profile/profile.component';
import { ChangepasswordComponent } from './profile/changepassword.component';
import { NotificationComponent } from './profile/notification.component';
import { ConnectionsComponent } from './profile/connections.component';
import { LiveaccListComponent } from './liveaccount/liveacc-list.component';
import { LiveaccEditComponent } from './liveaccount/liveacc-edit.component';
import { LiveaccDetailComponent } from './liveaccount/liveacc-detail.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: DashboardComponent,
    children: [
      // { path: 'ticketlist', component: TicketListComponent },
      { path: 'ticket/lists', component: TicketListComponent },
      { path: 'ticket/edit/:id', component: TicketEditComponent },
      { path: 'ticket/detail/:id', component: TicketDetailComponent },
      { path: 'liveaccount/lists', component: LiveaccListComponent },
      { path: 'liveaccount/edit/:id', component: LiveaccEditComponent },
      { path: 'liveaccount/detail/:id', component: LiveaccDetailComponent },
      { path: 'profile/account', component: ProfileComponent },
      { path: 'profile/changepassword', component: ChangepasswordComponent },
      { path: 'profile/notification', component: NotificationComponent },
      { path: 'profile/connections', component: ConnectionsComponent },
      { path: 'logout', component: LogoutComponent },
      { path: 'document/lists', component: DocumentListComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
