import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AppRoutes } from "./app.routes";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule, MatInputModule, MatButtonModule, MatListModule, MatCardModule, MatMenuModule, MatIconModule, MatDialogModule, MatSelectModule, MatToolbarModule } from '@angular/material';
import { environment } from '../environments/environment';
import { CreateEditListComponent } from "./create-edit-list/create-edit-list.component";
import { EditTaskComponent } from './edit-task/edit-task.component';
import { ListService } from "./services/list.service";
import { TaskService } from "./services/task.service";
import { AuthService } from "./services/auth.service";
import { AuthGuard } from "./services/auth-guard.service";
import { LoginComponent } from './login/login.component';
import { TasklistComponent } from './tasklist/tasklist.component';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
    declarations: [
        AppComponent,
        CreateEditListComponent,
        EditTaskComponent,
        LoginComponent,
        TasklistComponent,
        NavbarComponent,
    ],
    entryComponents: [
        CreateEditListComponent,
        EditTaskComponent
    ],
    imports: [
        BrowserModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        AngularFireAuthModule,
        AngularFireDatabaseModule,
        AppRoutes,
        BrowserAnimationsModule,
        FormsModule,
        MatButtonModule,
        MatCardModule,
        MatListModule,
        MatMenuModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatDialogModule,
        MatSelectModule,
        MatToolbarModule
    ],
    exports: [
        MatButtonModule,
        MatCardModule,
        MatListModule,
        MatMenuModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatDialogModule,
        MatSelectModule
    ],
    providers: [ListService, TaskService, AuthService, AuthGuard],
    bootstrap: [AppComponent]
})
export class AppModule { }
