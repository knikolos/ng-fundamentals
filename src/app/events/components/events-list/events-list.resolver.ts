import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IEvent } from 'src/app/events/models/event';
import { EventService } from 'src/app/events/services/event.service';

@Injectable({
    providedIn: 'root',
})
export class EventsListResolver implements Resolve<IEvent[]> {
    constructor(private eventService: EventService) { }

    resolve(): Observable<IEvent[]> {
        return this.eventService.getEvents();
    }
}