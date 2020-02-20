import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IEvent } from 'src/app/events/models/event';

@Component({
  selector: 'events-list',
  templateUrl: './events-list.component.html'
})
export class EventsListComponent implements OnInit {
  events: IEvent[];

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.data
      .subscribe((data: { events: IEvent[] }) =>
        this.events = data.events
      );
  }
}
