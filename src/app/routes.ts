import { Routes } from '@angular/router';

import {
    EventsListComponent,
    EventsListResolver,
    EventDetailsComponent,
    EventResolver,
    CreateEventComponent,
    CreateSessionComponent
} from './events/index';
import { Error404Component } from './errors/error-404/error-404.component';

export const appRoutes: Routes = [
    { path: 'events/new', component: CreateEventComponent },
    { path: 'events/session/new', component: CreateSessionComponent },
    { path: 'events', component: EventsListComponent, resolve: { events: EventsListResolver } },
    { path: 'events/:id', component: EventDetailsComponent, resolve: { event: EventResolver } },
    { path: '404', component: Error404Component },
    { path: '', pathMatch: 'full', redirectTo: '/events' },
    {
        path: 'user',
        loadChildren: () => import('./user/user.module').then(m => m.UserModule)
    },
];