import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { IEvent } from '../models/event';
import { EventService } from '../services/event.service';

@Injectable({
    providedIn: 'root'
})
export class EventResolver implements Resolve<IEvent> {
    constructor(private eventService: EventService) { }

    resolve(route: ActivatedRouteSnapshot): Observable<IEvent> {
        return this.eventService.getEvent(route.params["id"]);
    }
}