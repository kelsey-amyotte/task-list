import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from "./services/auth-guard.service";
import { TasklistComponent } from "./tasklist/tasklist.component";
import { LoginComponent } from "./login/login.component";

const appRoutes: Routes = [
    {
        path: '',
        component: LoginComponent
    },
    {
        path: 'tasklist',
        canActivate: [AuthGuard],
        component: TasklistComponent
    }
];

export const AppRoutes = RouterModule.forRoot(appRoutes);