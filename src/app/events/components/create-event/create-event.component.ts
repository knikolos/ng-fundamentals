import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IEvent } from '../../models/event';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent {
  newEvent: IEvent;

  constructor(private router: Router, private eventService: EventService) { }

  saveEvent(formValues) {
    this.eventService.saveEvent(formValues)
      .subscribe(() => this.router.navigate(["/events"]));
  }

  cancel() {
    this.router.navigate(["/events"]);
  }
}
