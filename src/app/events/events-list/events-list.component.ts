import { Component, OnInit } from '@angular/core';
import { IEvent } from 'src/app/data/event';
import { EventService } from 'src/app/data/event.service';
import { ToastrService } from 'src/app/common/toastr.service';

@Component({
  selector: 'events-list',
  templateUrl: './events-list.component.html'
})
export class EventsListComponent implements OnInit {
  events: IEvent[];

  constructor(private eventService: EventService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.events = this.eventService.getEvents();
  }

  onEventClick(event: string): void {
    this.toastr.info(event);
  }
}
