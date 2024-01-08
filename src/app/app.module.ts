// C:\xampp8.2\htdocs\vt_portal_angular\src\app\app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TicketListComponent } from './ticket/ticket-list.component';
import { TicketEditComponent } from './ticket/ticket-edit.component';
import { TicketDetailComponent } from './ticket/ticket-detail.component';

import { DocumentListComponent } from './document/document-list.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { LogoutComponent } from './logout/logout.component';
import { MdbModalService } from 'mdb-angular-ui-kit/modal';
import { NgSelectModule } from '@ng-select/ng-select';
import { ProfileComponent } from './profile/profile.component';
import { ChangepasswordComponent } from './profile/changepassword.component';
import { NotificationComponent } from './profile/notification.component';
import { ConnectionsComponent } from './profile/connections.component';
import { ProfileNavigationComponent } from './profile/profile-navigation.component';
import { LiveaccountComponent } from './liveaccount/liveaccount.component';
import { LiveaccListComponent } from './liveaccount/liveacc-list.component';
import { LiveaccEditComponent } from './liveaccount/liveacc-edit.component';
import { LiveaccDetailComponent } from './liveaccount/liveacc-detail.component';
// import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    HeaderComponent,
    SidebarComponent,
    TicketListComponent,
    DocumentListComponent,
    TicketEditComponent,
    TicketDetailComponent,
    LogoutComponent,
    ProfileComponent,
    ChangepasswordComponent,
    NotificationComponent,
    ConnectionsComponent,
    ProfileNavigationComponent,
    LiveaccountComponent,
    LiveaccListComponent,
    LiveaccEditComponent,
    LiveaccDetailComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule, // Add this line
    AppRoutingModule,
    HttpClientModule, // Add HttpClientModule to the imports array
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added here
    NgSelectModule,
    ReactiveFormsModule
  ],
  providers: [MdbModalService],
  bootstrap: [AppComponent]
})
export class AppModule { }




